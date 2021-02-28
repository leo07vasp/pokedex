import React from 'react';



const Paginate = (props) => {

    

    return (
        <div className="paginacao">
            <ul>
                {props.page.previous && (<li onClick={() => props.changePokes(props.page.previous)}>pagina anterior</li>)}
                {props.page.next && (<li onClick={() => props.changePokes(props.page.next)}>proxima pagina </li>)}
            </ul>
        </div>
    )
}





export default Paginate;