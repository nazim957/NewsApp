import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps={
        country: 'in',
        pageSize: 9,
        category: "general"
    }

    static propTypes={
        country: PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }

    constructor(){
        super();
        // console.log("Hello i am a constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page:1
            
        }
    }
 //rus after render method
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=662fe35159ee42a0a0e46ee4aaed2f0d&page=1&pageSize=${this.props.pageSize}`
       this.setState({loading:true})
        let data = await fetch(url);
        let parseData= await data.json()
        console.log(data);

        this.setState({articles: parseData.articles,
             totalResults: parseData.totalResults,
            loading: false
            })
    }

    handlePrevClick=async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=662fe35159ee42a0a0e46ee4aaed2f0d&page=${this.state.page -1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url);
        let parseData= await data.json()

        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }

    handleNextClick=async ()=>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=662fe35159ee42a0a0e46ee4aaed2f0d&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url);
        let parseData= await data.json()


        this.setState({
            page: this.state.page +1,
            articles: parseData.articles,
            loading: false
        })
    }
}

  render() {
    return (
      <div className='container my-3'>
       <h2 className='mb-2 text-center'>Newly News - Top Headlines</h2>
       {this.state.loading && <Spinner />}
       <div className="row">
       { !this.state.loading && this.state.articles.map((element)=>{
        return    <div className="col-md-4"  key={element.url}> 
        <NewsItem title={!element.title?element.title:""} 
        description={element.description?element.description:null}
        imageUrl={element.urlToImage?element.urlToImage:"https://images.moneycontrol.com/static-mcnews/2023/04/morning-scan-5-770x431.jpg"}
        newsUrl={element.url}
        />
        </div>
       })}
       </div>
       <div className="container d-flex justify-content-between">
       <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
       <button disabled={this.state.page>= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
       </div>
      </div>
    )
  }
}

export default News
