import ReactStarRating from "react-star-ratings-component";
import React from 'react'

export default function Reseña(props) {
    return (
        <div class="">
                <div class="flex justify-center container w-full mx-auto py-12 px-4">
                    <div class="  flex justify-center w-2/3  bg-gray-300 rounded-3xl border-blue-900 border shadow-lg pb-6 lg:pb-0">
                        <div class="w-full  p-4">
                            <div class="justify-items-center ">

                                <h3 class="text-blue mx-7 font-semibold text-lg text-center md:text-left ">{props.resena.usuario} dice:</h3>
                                <p class="work-sans font-semibold text-xl text-white"></p>
                                <div class="mx-5 mb-1">
                                    <ReactStarRating numberOfStar={5} numberOfSelectedStar={props.resena.rating} colorFilledStar="yellow" colorEmptyStar="blue" starSize="25px" spaceBetweenStar="8px" disableOnSelect={true} />
                                </div>
                                <textarea name="comentario" value={props.resena.comentario} class="rounded-md bg-gray-200 text-xl leading-normal resize-none w-full h-20 py-2 px-3 font-medium text-gray-700 focus:outline-none "></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}