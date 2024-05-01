import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Spin, Form, Input, message, Popover, Modal } from 'antd';
import { StarFilled } from '@ant-design/icons';
import PokeDex from './PokeDex';
import capitalizeName from "../components/capitalizeName";

function PokeGrid() {

  const [pokeDetail, setPokeDetail] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();
	const [isLoading, setIsLoading] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [favorites, setFavorites] = useState();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showPokeDex, setShowPokeDex] = useState(false);
  const [pokeDataById, setPokeDataById] = useState(null);
  const [form] = Form.useForm();
  const { Meta } = Card;

  const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  const fetchPokeDetails = async (value) => {
    let url
    queryParams ? url = value : url = value.url
    const responseDetail = await fetch(url);
    const responseJson = await responseDetail.json();
    return responseJson;
  }

  const fetchPokemons = async (url) => {
    try {
      setIsLoading(true);
      let pokeDetailData
      if (queryParams?.length >= 1) {
        pokeDetailData = await fetchPokeDetails(url)
        setPokeDetail([pokeDetailData]);
      }
      else {
        const pokeUrlData = await fetch(url);
        const pokeUrlsJson = await pokeUrlData.json();
        setNextUrl(pokeUrlsJson.next);
        setPreviousUrl(pokeUrlsJson.previous);

        pokeDetailData = pokeUrlsJson.results.map(async (value) =>
          fetchPokeDetails(value)
        );
        const pokeDetails = await Promise.all(pokeDetailData);
        setPokeDetail(pokeDetails);
      }

    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemons(`${baseUrl}?limit=30`);
  }, []);

  useEffect(() => {
    if (queryParams) {
      fetchPokemons(`${baseUrl}/${queryParams}`);
    }
  }, [queryParams]);

  const fetchNextPage = () => {
    fetchPokemons(nextUrl);
  }

  const fetchPreviousPage = () => {
    fetchPokemons(previousUrl);
  }

  const onFinish = (values) => {
    const queryString = values.query
    setQueryParams(queryString)
  }

  const addToFavorites = (pokeId) => {
    message.success('Poke added to favorites');
    if (favorites) {
      setFavorites([...favorites, pokeId]);
    } else {
      setFavorites([pokeId]);
    }
  }

  const viewFavorites = () => {
    setShowFavorites(true);
    if (favorites === undefined) {
      message.error('You do not have any favorites at the moment');
    }
  };

  const handleMoreDetail = (poke) => {
    setShowPokeDex(true);
    setPokeDataById(poke);
  };

  const handleOk = () => {
    setShowPokeDex(false);
  }
  const handleCancel = () => {
    setShowPokeDex(false);
  }

  const renderPokeList = (pokes) => {
    return pokes.map(poke =>
      <Col lg={8} xs={16} key={poke.id}>
        <Card
          hoverable
          style={{ margin: 48, height: 420, width: 280}}
          cover={<img src={poke.sprites.front_default} alt='poke-img' style= {{ width: "100%", background: "#8899A6" }} />}
        >
          <Row>
            <Col lg={21}>
              <Meta title={capitalizeName(poke.name)} />
            </Col>
            <Col lg={3}>
              {!showFavorites &&
                <Popover
                  trigger="hover"
                  placement="topLeft"
                  content={<div>Add to favorites</div>}
                  onClick = {() => addToFavorites(poke.id)}
                >
                  <StarFilled className="ml-5" style={{ color: "#ffcb05", fontSize: "24px" }}/>
                </Popover>
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <button
                className="button-primary"
                onClick={() => handleMoreDetail(poke)}
                style={{marginTop: "28px"}}
              >
                More
              </button>
            </Col>
          </Row>
        </Card>
      </Col>
    )
  }

  const handleBack = () => {
    setShowFavorites(false);
    renderPokeList(pokeDetail);
  }

  const pokeList = renderPokeList(pokeDetail);

  const favoritePokeList = renderPokeList(
    pokeDetail?.filter(poke => favorites?.includes(poke.id))
  );

  return (
    <Spin spinning={isLoading}>
      <Row justify="center" >
        <Col lg={20} xs={22}>
          {!showFavorites &&
            <Form
              form={form}
              onFinish={onFinish}
              size="large"
            >
              <Row justify="space-between" style={{ marginTop: '36px' }}>
                <Col xxl={8} lg={8} xs={24}>
                  <Form.Item name="query">
                    <Input placeholder='Search for a Pokemon'/>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          }
          <Row justify="end">
            <Col>
              {showFavorites ?
                <button
                  className="button-primary"
                  type="primary"
                  onClick={handleBack}
                >
                  Back
                </button>
              :
                <button
                  className="button-primary"
                  onClick={viewFavorites}
                >
                  View Favorites
                </button>
              }
            </Col>
          </Row>
          <Row>
          {showFavorites ? favorites && favoritePokeList : pokeList}
          {showPokeDex && pokeDataById && (
            <Modal open={showPokeDex} onOk={handleOk} onCancel={handleCancel}>
              <PokeDex pokeDataById={pokeDataById} />
            </Modal>
          )}
          </Row>
          {previousUrl &&
            <Button onClick={fetchPreviousPage} style={{ marginRight: "10px" }}>Previous</Button>
          }
          {nextUrl && pokeDetail.length === 30 &&
            <Button onClick={fetchNextPage}>Next</Button>
          }
        </Col>
      </Row>
    </Spin>
  );
}

export default PokeGrid;
