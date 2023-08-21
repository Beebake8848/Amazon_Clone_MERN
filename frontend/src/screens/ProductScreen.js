import axios from "axios";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

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

function ProductScreen(){

    const params = useParams();
    const {slug} = params;

    const [state,dispatch]=useReducer(reducer,

    {
      product:[],
      loading:true,
      error:'',
    });



  const {loading,error,product}=state ??{};
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    dispatch({ type: 'FETCH_REQUEST'});
    try{ 
      const result = await axios.get(`/api/products/slug/${slug}`);
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data});
    } catch(err){
      dispatch({ type: 'FETCH_FAIL', payload:err.message});
    }
      // setProducts(result.data);
    };
    fetchData();
  }, []); 


    return (
        <div>
            <h1>{slug}</h1>
        </div>
    )

}
export default ProductScreen;