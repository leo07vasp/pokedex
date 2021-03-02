import React, {useEffect, useState} from 'react';



const Paginate = (props) => {


    const [actualPage, setActualPage] = useState([]);
    const [limit, setLimit] = useState([]);

    useEffect(() =>{
        console.log(props.page.next)
        
        if(props.page.next){
            const url = new URL(props.page.next);
            const args =  new URLSearchParams(url.search);
            setActualPage((args.get('offset'))/args.get('limit'))
            setLimit(args.get('limit'))
        }

    },[props.page])

    const goToPage = (e,nPagina) =>{
        e.preventDefault();
        console.log(`https://pokeapi.co/api/v2/pokemon?offset=${nPagina*8}&limit=8`)
        props.changePokes(`https://pokeapi.co/api/v2/pokemon?offset=${(nPagina-1)*8}&limit=8`)
      }
    

    return (
        <nav aria-label="Page navigation example">
            

            <ul className="pagination justify-content-center">
                <li class={`page-item ${!props.page.previous ? 'disabled' : ''}`}><a class="page-link" onClick={() => props.changePokes(props.page.previous)} href="#">Página anterior</a></li>
                {actualPage > 2 && <li class={`page-item`}><a onClick={(e)=>goToPage(e,actualPage-2)} href="#" className="page-link">{actualPage-2}</a></li>}
                {actualPage > 1 && <li class={`page-item`}><a onClick={(e)=>goToPage(e,actualPage-1)} href="#" className="page-link">{actualPage-1}</a></li>}
                <li class={`page-item active`}><a className="page-link">{actualPage}</a></li>
                <li class={`page-item`}><a onClick={(e)=>goToPage(e,actualPage+1)} href="#" className="page-link">{actualPage+1}</a></li>
                <li class={`page-item`}><a onClick={(e)=>goToPage(e,actualPage+2)} href="#" className="page-link">{actualPage+2}</a></li>
                <li class={`page-item ${!props.page.next ? 'disabled' : ''}`}><a href="#" class="page-link" onClick={() => props.changePokes(props.page.next)} href="#">Próxima página</a></li>
            </ul>
        </nav>
    )
}





export default Paginate;