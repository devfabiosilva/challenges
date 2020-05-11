import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import Cards from '../cards';
import { f_getKey } from '../../utils';
import { 

    allHeroes,
    THUMBNAIL_PER_PAGE

} from './../../service/api';
import Notification, { notificationType } from '../notification';
import { m_query } from '../../actions';
import './style.css';
/*
 * Formata os dados vindo da API marvel e retorna somente os valores relevantes
 * como 
 *  id, name, thumb e series
 */
function formatPagination(marvel_res) {

    let data = [];
    let tmp = null;
    let i;
    let marvel_res_len = marvel_res.length - 1;

    for ( i = 0 ; i < THUMBNAIL_PER_PAGE ; i++ ) {

        if ( i <= marvel_res_len ) {

            tmp = {

                id: marvel_res[i].id,
                name: marvel_res[i].name,
                thumb: `${marvel_res[i].thumbnail.path}.${marvel_res[i].thumbnail.extension}`,
                series: marvel_res[i].series

            }

        } else {

            tmp = {

                id: f_getKey(),
                name: "",
                thumb: "",
                series: ""

            }

        }

        data.push(tmp);

    }

    return data;

}

export function Paginate(props) {

    const [ formatedData, setFormatedData ] = useState(null);
    const [ paginationInfo, setPaginationInfo ] = useState(null);
    const [ stringSearchResult, setStringSearchResult ] = useState(null);
    const [ pageData, setPageData ] = useState(null);
    const [ notificationMessage, setNotificationMessage ] = useState(null);

    /*
    // Improve in TypeScript version
     Notification message should be null or {
         type as notification
         title,
         message,
     }
    */
    const [ beginNavigate, setBeginNavigate ] = useState(
        {
            start: false,
            currentPage: 0,
            offset: 0,
            textToFind: null
        }
    )
    /*{
//Usar TypeScript no futuro (pagination info type)
        offset: '',
        limit: '',
        total: '',
        count: ''
    
    });*/

    useEffect (

        () => {


            let info;
            let tmp;

            function formatStringSearchResult() {

                let str = null;
                let pageDataTmp = null;

                if (paginationInfo) {
        
                    str = props.state.interface.pag_header_search_text.replace(/%d/g, paginationInfo.total);
                    pageDataTmp = calculatePagination(paginationInfo);
        
                    str = str.replace(/%e/g, pageDataTmp.currentPage.toString());
        
                    str =str.replace(/%f/g, pageDataTmp.numberOfPages.toString());

                    setPageData(pageDataTmp);
        
                }
        
                return str;
        
            }

            if (props.marvel_query_pagination.update_query) {
                /* Deve se retornar apenas números da página. Se a páagina passar um string, ele
                deve ser convertido para ficar comapatível com o react-paginate */
                if (typeof( tmp = props.marvel_query_pagination.page ) === 'number')
                    tmp--;
                else if ( isNaN( tmp = parseInt( tmp ) ) ) 
                    tmp = 0;
                else
                    tmp--;
    
                if (tmp<0)
                    tmp=0

                setBeginNavigate(
                    {
                        start: true,
                        currentPage: tmp,
                        offset: tmp*THUMBNAIL_PER_PAGE,
                        textToFind: props.marvel_query_pagination.name
                    }
                );

                props.m_setCustomQuery(props.marvel_query_pagination);

            }

            if (beginNavigate.start) {

                allHeroes(beginNavigate.offset, beginNavigate.textToFind).then((res) => {

                    setFormatedData(formatPagination(res.data.data.results))

                    info = {

                        offset: res.data.data.offset,
                        limit: res.data.data.limit,
                        total: res.data.data.total,
                        count: res.data.data.count
    
                    }
      
                    setPaginationInfo(
                        info
                    );

                    (info.count)?setNotificationMessage(null):setNotificationMessage(
                            {
                                type: notificationType.NOTF_ALERT,
                                title: props.state.interface.err_not_found_title,
                                message: props.state.interface.err_search_not_found.replace(/%d/, beginNavigate.textToFind)
                            }
                        );

                }, (e) => {

                    if ((!notificationMessage)||(notificationMessage.type!==notificationType.NOTF_ERROR)) {

                        tmp=props.state.interface.err_marvel_server_error_msg.replace(
                                /%d/,
                                e.internalError.code
                            );

                        setNotificationMessage(
                            {
                                type: notificationType.NOTF_ERROR,
                                title: `${e.err} (${(e.errTxt)})`,
                                message: tmp.replace(/%e/, e.internalError.message)

                            }
                        );
                        setPaginationInfo(
                            {

                                offset: 0,
                                limit:  0,
                                total:  0,
                                count:  0
                            }
                        );
                        setBeginNavigate(
                            {
                                start: false,
                                currentPage: 0,
                                offset: 0,
                                textToFind: null
                            }
                        )
                        setFormatedData(null);
                    }

                });

                setBeginNavigate(
                    {
                        start: false,
                        currentPage: beginNavigate.currentPage,
                        offset: beginNavigate.offset,
                        textToFind: beginNavigate.textToFind
                    }
                )

            }

            if (paginationInfo)
                setStringSearchResult(formatStringSearchResult());

        },
        [ 
            formatedData, 
            paginationInfo, 
            stringSearchResult, 
            beginNavigate,
            notificationMessage,
            props
        ]
    
    )

    function startPageNavigation(page) {

        let message;

        if (page.selected===beginNavigate.currentPage)
            return;

        message = props.state.interface.loading_page.replace(/%d/, page.selected+1);

        message = message.replace(/%e/, pageData.numberOfPages);

        setNotificationMessage(
            {
                type: notificationType.NOTF_INFO,
                message
            }
        );

        props.m_setCustomQuery(
            {
                name: props.marvel_query_pagination.name,
                page: page.selected+1
            }
        )
    }

    function calculatePagination(pgInfo) {

    /*
     * Responsável por calcular a página atual e o numero de páginas
     */
        let calculated = null;

        if (pgInfo) {

            calculated = {

                currentPage: Math.ceil((parseFloat(pgInfo.offset)+parseFloat(pgInfo.count))/THUMBNAIL_PER_PAGE),
                numberOfPages: Math.ceil(parseFloat(pgInfo.total)/THUMBNAIL_PER_PAGE)

            }

        }

        return calculated;

    }

    if (notificationMessage) {
        return (
            <div className="pagination-container"
                style={
                    {
                        display: "flex",
                        justifyContent: "center"
                    }
                }
            >

                <Notification 
                    nType={ notificationMessage.type } 
                    title= { notificationMessage.title }
                >

                    { notificationMessage.message }

                </Notification>

            </div>
        )
    } else if (formatedData)
        return (
            <div className="pagination-container">
                <div className="pagination-header">
                    { stringSearchResult }
                </div>
                <div className="pagination-body">
                    <Cards formatedData={ formatedData }/>
                </div>
                <div className="pagination-navigator">
                    <ReactPaginate

                        pageCount={ (pageData)?pageData.numberOfPages:1 }
                        pageRangeDisplayed={6}
                        marginPagesDisplayed={1}

                        forcePage={ beginNavigate.currentPage }

                        previousLabel={ props.state.interface.previous }
                        nextLabel={ props.state.interface.next }
                        breakLabel={'...'}
                        onPageChange={ startPageNavigation }

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
    else 
        return (
            <div className="pagination-container"
                style={
                    {
                        display: "flex",
                        justifyContent: "center"
                    }
                }
            >

                <Notification>

                    { props.state.interface.loading_characters }

                </Notification>

            </div>
        )
}

const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage,
    marvel_query_pagination: state.m_setQuery
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    m_setCustomQuery: (e) => dispatch(m_query(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);
