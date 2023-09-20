import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {

    const[articles, setArticles] = useState([])
    const[loading, setLoading] = useState(true)
    const[page, setPage] = useState(1)
    const[totalResults, setTotalResults] = useState(0)
 
 const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
 }

//   constructor(props) {
//     super(props);
//     // console.log("Hello i am a constructor from news component");
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1,
//       totalResults: 0
//     };
    // document.title = `${capitalizeFirstLetter(props.category)} - NewlyNews`;
 // }

  const updateNews = async ()=> {
    props.setProgress(0)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parseData = await data.json();
    props.setProgress(70)
   // console.log(data);
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)

    props.setProgress(100)
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewlyNews`;
    updateNews();
    // eslint-disable-next-line
  },[])

  //run after render method
//   async componentDidMount() {
//     this.updateNews();
//   }

//   handlePrevClick = async () => {
//     this.setState({ page: this.state.page - 1 });
//     this.updateNews();
//   };

//   handleNextClick = async () => {
//     this.setState({ page: this.state.page + 1 });
//     this.updateNews();
//   };

  const fetchMoreData = async () => {
    // setState({page: this.state.page +1})
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parseData = await data.json();
   // console.log(data);
    setArticles(articles.concat(parseData.articles))
    setTotalResults( parseData.totalResults)
  };

    return (
        <>
       
        <h2 className="text-center" style={{margin: '35px 0px', marginTop:'90px'}}> Newly News - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
            <div className="container">
        <div className="row">
       
          {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={!element.title ? element.title : ""}
                    description={
                      element.description ? element.description : null
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://images.moneycontrol.com/static-mcnews/2023/04/morning-scan-5-770x431.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              )
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  
}

export default News;

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

