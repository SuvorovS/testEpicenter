import React, { Component } from 'react';
import Slider from 'react-slick';
import Spec from './spec';
import axios from 'axios';
import './item.scss'

class Item extends Component  {
    constructor(props){
        super(props);
        this.state = {
               color : 0,
               colorDescription : 0,
               quantity : 1,
               rating : 0,
               specIsShown : false,
        }
    }
    componentWillMount(){
        this.setState({
            rating : this.props.itemData.rating
        })
    }
    componentDidMount(){
        var star_widht = this.state.rating*17;
        this.rating_votes.style.width = star_widht + 'px';
        this.rating.onmouseenter = ()=>{
            this.rating_votes.style['display'] = 'none';
            this.rating_hover.style['display'] = 'block';
        }

        this.rating.onmouseleave = ()=>{
            this.rating_votes.style['display'] = 'block';
            this.rating_hover.style['display'] = 'none';
        }
            
        function getCoords(elem) {
            var box = elem.getBoundingClientRect();
            return {
                top: box.top + window.pageYOffset,
                left: box.left + window.pageXOffset,
            };
        }

        let margin_doc = getCoords(this.rating);
        window.addEventListener('resize', ()=>{
            margin_doc = getCoords(this.rating);
        }) 
        var user_votes;
        this.rating.onmousemove = ((e)=>{
            var widht_votes = e.pageX - margin_doc.left;
            user_votes = Math.ceil(widht_votes/17);  
            this.rating_hover.style['width'] = user_votes*17 + 'px';
        });
                           
        //отправка
        this.rating.addEventListener('click', ()=>{
                axios.post('http://localhost/www/testEpicenter/handler.php', {type : 'ratingVote', user_vote : user_votes, item_id : 1})
                    .then((res)=>{console.log(res);})
                    .catch(err=>{console.log(err); })
        });
    }

    choiseColor(e){ // обработчик клика по выбору цвета, изменяет значение текущего цвета в локальном стейте (при желании можно вынести в отдельное хранилище (Flux/Redux)))
        let colorId = +e.target.getAttribute('data-color_id');
        this.setState({
            color : colorId,
            colorDescription : colorId,
        })
        // тут же можно отправить AJAX запрос:
        // например через axios: axios.get('url') axios.post('url', {параметры для тела запроса})
        // можно на чистом XmlHttpRequest
    }
    more(e){
        this.setState({
            quantity : this.state.quantity+1
        })
    }
    less(e){
        if (this.state.quantity > 0) {
            this.setState({
                quantity : this.state.quantity-1
            })
        }
    }
    addToCard(){
        axios.post('http://localhost/www/testEpicenter/handler.php', {type : 'addToCard', order : {
            color : this.props.itemData.colorDescription[this.state.colorDescription],
            quantity : this.state.quantity,
        }})
            .then(res=>{console.log(res.data); })
            .catch(err=>{console.log(err); })

    }
    showSpeck(){
        this.setState({
            specIsShown : !this.state.specIsShown,
        })
    }
    render() {
        return (
            <div className='item clearfix'>
                <div className="item__promo">
                    <div className='brandLogo'>
                        <img src="img/brand.jpg" alt="brandLogo"/>
                    </div>
                    <div className='slider_wraper'>

                        <Slider arrows={false} autoplay={false} dots={ true }>
                            {
                                this.props.itemData.img[this.state.color].map((el, index)=>{
                                    return (
                                        <div className="slide" key={index}><img src={el} alt={`slide${index}`} /></div>
    
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
                <div className="item__main">
                    <div className="item__main__header clearfix">
                        <div className="item__main__header-articul">Model: {this.props.itemData.articule}</div>
                        <div className="item__main__header-spec" onClick={this.showSpeck.bind(this)}>
                            <span>
                                {
                                    !this.state.specIsShown? 
                                        <img src="img/spec.jpg" alt="кнопка"/> 
                                    :
                                        <span className='closeSpec'>+</span>
                                }
                                SPEC
                            </span>
                        </div>
                        
                    </div>
                    <div className="item__main_Brand">{this.props.itemData.brand}</div>
                    <div className="item__main_colorDescription">{this.props.itemData.colorDescription[this.state.colorDescription]}</div>
                    <div className="item__main_shotDescription">{this.props.itemData.shotDescription}</div>
                    <div className="item__main__description">
                        <div className="item__main__description-foolDescription">   
                             {this.props.itemData.foolDescription}
                        </div>
                        <div className="item__main__description-reiting clearfix">   
                            <div ref={(rating) => this.rating = rating} id="rating" className="reiting__stars">
                                <div ref={(rating_blank) => this.rating_blank = rating_blank} id="rating_blank"></div>
                                <div ref={(rating_hover) => this.rating_hover = rating_hover} id="rating_hover"></div>
                                <div ref={(rating_votes) => this.rating_votes = rating_votes} id="rating_votes"></div>
                            </div>

                            <div className="reiting__rewiews">
                                <span className='rating'>{this.props.itemData.rating} </span> 
                                <span className='rewiews'>({this.props.itemData.rewiewsTotal} reviews)</span>
                            </div>
                        </div>
                        <div className="meta clearfix">
                            <div className="price">
                                ${this.props.itemData.price}
                                <div className="price__label">Shipping and taxes extra</div>
                            </div>
                            <div className="colorChoice">
                                <div className="colorChoice__label">
                                    Choose your colors:
                                </div>
                                {
                                    this.props.itemData.color.map((el, i)=>{
                                        if (this.state.color === i) {
                                            let style = {backgroundColor: this.props.itemData.color[i]}
                                            return (<div onClick={this.choiseColor.bind(this)} data-color_id={i} key={i} style={style} className="colorPeacker active"> </div>)
                                        }
                                        else {
                                            let style = {backgroundColor: this.props.itemData.color[i]}
                                            return (<div onClick={this.choiseColor.bind(this)} style={style} data-color_id={i} key={i} className="colorPeacker"> </div>)
                                        }
                                    })
                                }
                            </div>
                        </div>
                        
                    </div>
                    <div className="item__main__operation clearfix">
                        <div className="quantity">
                            <div className="quantity_block quantity_block-label">Quantity</div>
                            <div className="quantity_block quantity_block-number">{this.state.quantity}</div>
                            <div className="quantity_block quantity__arrows">
                                <div className='quantity__arrows-up' onClick={this.more.bind(this)}>
                                    <img src="img/arrow_up.jpg" alt="стрелка вверх"/>
                                </div>
                                <div className='quantity__arrows-down ' onClick={this.less.bind(this)}>
                                    <img src="img/arrow_down.jpg" alt="стрелка вверх"/>
                                </div>
                            
                            </div>
                        </div>
                        <div className="addToCard">
                            <div onClick={ this.addToCard.bind(this)}>Add to card</div>
                        </div>
                    </div> 
                </div>
                 { this.state.specIsShown ? <Spec /> : '' } 
            </div>
        );
    }
}

export default Item;