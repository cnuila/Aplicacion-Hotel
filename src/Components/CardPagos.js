import React, { Component } from 'react'
import PaypalButton from './PaypalButton'

export default class CardPagos extends Component {
    act(){
        console.log(process.env.REACT_APP_CLIENT_ID);
    }

    render() {
        return (
            <div class="bg-white flex flex-initial flex-col justify-center w-96 h-60 text-black rounded-lg shadow-md">
                <div>Subtotal: </div>
                <div>Impuesto: </div>
                <div>Total: {this.props.total}</div>
                <div class="flex flex-row justify-between w-auto px-5">
                    <PaypalButton total={this.props.total}/>
                    <div>Otras opciones aqui</div>
                </div>
            </div>
        )
    }
}
