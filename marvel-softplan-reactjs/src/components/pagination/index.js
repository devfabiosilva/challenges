import React from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import Cards from '../cards';
import './style.css';

function teste(e) {
    console.log("Teste");
    console.log(e);
}
export function Paginate(props) {

    return (
        <div className="pagination-container">
            <div className="pagination-header">
                { props.state.interface.pag_header_search_text }
            </div>
            <div className="pagination-body">
                <Cards />
            </div>
            <div className="pagination-navigator">
                <ReactPaginate

                    pageCount={300}
                    pageRangeDisplayed={6}
                    marginPagesDisplayed={1}

                    previousLabel={ props.state.interface.previous }
                    nextLabel={ props.state.interface.next }
                    breakLabel={'...'}
                    onPageChange={ teste }

                    breakClassName={ 'pag-break-class' }
                    breakLinkClassName={ 'pag-link-class' }
                    containerClassName={ 'pag-container-class' }
                    pageClassName={ 'pag-page-class' }
                    pageLinkClassName={ 'pag-link-class' }
                    activeClassName={ 'pag-active-class' }
                    activeLinkClassName={ 'pag-activelink-class' }
                    previousClassName={ 'pag-previous-class' }
                    nextClassName={ 'pag-next-class' }
                    previousLinkClassName={ 'pag-prev-link-class' }
                    nextLinkClassName={ 'pag-nextlink-class' }
                    disabledClassName={ 'pag-disabled-class' }

                />
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage
});

export default connect(mapStateToProps)(Paginate);

