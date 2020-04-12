import React from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';

function teste(e) {
    console.log("Teste");
    console.log(e);
}
export function Paginate(props) {

    return <ReactPaginate

        pageCount={300}
        pageRangeDisplayed={8}
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
}

const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage
});

export default connect(mapStateToProps)(Paginate);

