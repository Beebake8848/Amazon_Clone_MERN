import { useEffect, useReducer, } from "react";
// import data from "../data";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading:true};
    case 'FETCH_SUCCESS':
      return {...state, products:action.payload, loading:false };
    case 'FETCH_FAIL':
      return {...state, loading:false, error: action.payload};
      default:
        return state;
  }
};

function HomeScreen() {
  //store
  // reducer 
  //action 
/*


//action => type , payload
Login screen => Login button click =>  type =>FETCHIHNG_REQ 


 */

  //useReducer is like the useState but look the action and the state 

  //action is used to broadcast the type
  //reducer will listen the action types and wor
  const [state,dispatch]=useReducer(logger(reducer),

    {
      products:[],
      loading:true,
      error:'',
    })



  const {loading,error,products}=state ??{};
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    dispatch({ type: 'FETCH_REQUEST'});
    try{ 
      const result = await axios.get('/api/products');
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data});
    } catch(err){
      dispatch({ type: 'FETCH_FAIL', payload:err.message});
    }
      // setProducts(result.data);
    };
    fetchData();
  }, []);
  // console.log('teh valueo fothe lod',loading)
  // console.log('teh valueo fothe lod',error)
    return <div>
        <h1>Featured Products</h1>
        <div className='products'>
          {
            loading? (<div>Loading...</div>)
            :
            error? (<div>{error}</div>
            ):
            <Row>{
          products.map(product => (
            <Col  key={product.slug} sm={6} md={4} lg={3} className="mb-3">
          <Product product={product}></Product>
          </Col>))}
          </Row>
          }
          </div>

    </div>
}

export default HomeScreen;