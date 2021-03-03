import React, { useEffect, useState } from "react";

const Paginate = (props) => {
  const [actualPage, setActualPage] = useState([]);
  const [limit, setLimit] = useState([]);
  const [offset, setOffset] = useState([]);
  const [nPage, setNPage] = useState(1);

  useEffect(() => {
    
    if (props.page.next) {
      const url = new URL(props.page.next);
      const args = new URLSearchParams(url.search);
      setActualPage(args.get("offset") / args.get("limit"));
      setLimit(args.get("limit"));
      setOffset(args.get("offset"));
    } else {
      setActualPage(139);
    }
  }, [props.page]);

  const goToPage = (e, nPagina) => {
    e.preventDefault();
    setNPage(nPagina === 139 ? 139 : nPagina )
    props.changePokes(
      nPagina === 139 ? "https://pokeapi.co/api/v2/pokemon?offset=1112&limit=6" :`https://pokeapi.co/api/v2/pokemon?offset=${(nPagina - 1) * 8}&limit=8`
    );
  };

  return (
    <nav className="text-white" aria-label="Page navigation example">
       {/* {JSON.stringify(props.page.count)} */}
       {nPage === 139 ? (
       <p className="text-white text-center">{`${(nPage * 8)-8 === 0 ? 1 : (nPage * 8)-6} - ${nPage * 8} de 1112`}</p>
       ) : (
        <p className="text-white text-center">{`${(nPage * 8)-8 === 0 ? 1 : (nPage * 8)-8} - ${nPage * 8} de 1112`}</p>
       )}
       {/* {JSON.stringify(offset)} */}
      {/* <p className="text-white text-center">{`${offset - 8} - ${offset} de ${JSON.stringify(props.page.count)}`}</p> */}
      <ul className="pagination justify-content-center">
        <li class="page-item">
          <a
            onClick={() =>
              {setNPage(1); props.changePokes("https://pokeapi.co/api/v2/pokemon?limit=8")}
            }
            href="#"
            class="page-link"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class={`page-item ${!props.page.previous ? "disabled" : ""}`}>
          <a
            class="page-link"
            onClick={(e) => {setNPage(actualPage - 1); props.changePokes(actualPage === 139 ? goToPage(e, 138) : props.page.previous)}}
            href="#"
          >
            &lt;
          </a>
        </li>
        {actualPage > 2 && (
          <li class={`page-item`}>
            <a
              onClick={(e) => {setNPage(actualPage - 2); goToPage(e, actualPage - 2)}}
              href="#"
              className="page-link"
            >
              {actualPage - 2}
            </a>
          </li>
        )}
        {actualPage > 1 && (
          <li class={`page-item`}>
            <a
              onClick={(e) => goToPage(e, actualPage - 1)}
              href="#"
              className="page-link"
            >
              {actualPage - 1}
            </a>
          </li>
        )}
        <li class={`page-item active`}>
          <a className="page-link">{actualPage}</a>
        </li>
        {actualPage < 139 && (
          <li class={`page-item`}>
            <a
              onClick={(e) => {setNPage(actualPage + 1); goToPage(e, actualPage + 1)}}
              href="#"
              className="page-link"
            >
              {actualPage + 1}
            </a>
          </li>
        )}
        {actualPage < 139 && actualPage < 138 && (
          <li class={`page-item`}>
            <a
              onClick={(e) => {setNPage(actualPage + 2); goToPage(e, actualPage + 2)}}
              href="#"
              className="page-link"
            >
              {(actualPage + 2)}
            </a>
          </li>
        )}
        <li class={`page-item ${!props.page.next ? "disabled" : ""}`}>
          <a
            href="#"
            class="page-link"
            onClick={(e) => {setNPage(actualPage + 1); props.changePokes(actualPage === 138 ? goToPage(e, 139) : props.page.next)}}
            href="#"
          >
            &gt;{" "}
          </a>
        </li>
        <li class="page-item">
          <a
            onClick={() =>
              {setNPage(139);
              props.changePokes(
                "https://pokeapi.co/api/v2/pokemon?offset=1112&limit=6"
              )}
            }
            class="page-link"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginate;
