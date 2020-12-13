import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class reseña extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    
    render() {
        
        return (
            <div class="flex mx-auto items-center justify-center shadow-lg mt-56 mx-8 mb-4 max-w-lg">
                <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                    <div class="flex flex-wrap -mx-3 mb-10">
                        <h2 class="px-4 -pt-1 pb-2 text-gray-800 text-lg">Tu opinión es importante</h2>
                       <div class="w-full md:w-full px-3 mb-2 mt-2">
                            <textarea class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Danos tu Opinión' required></textarea>
                        </div>
                        <div class="w-full md:w-full flex items-start md:w-full px-3">
                            <input type='submit' class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Sube tu comentario' />
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}
export default reseña;