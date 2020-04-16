import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import Cards from '../cards';
import { f_getKey } from '../../utils';
import { allHeroes, THUMBNAIL_PER_PAGE } from './../../service/api';
import Notification, { notificationType } from '../notification';
import { m_findHero } from '../../actions';
import './style.css';

function formatPagination(marvel_res) {

    let data = [];
    let tmp = null;
    let i;
    let marvel_res_len = marvel_res.length - 1;

    for (i = 0 ; i < 8 ; i++ ) {

        if (i <= marvel_res_len) {

            tmp = {

                id: marvel_res[i].id,
                name: marvel_res[i].name,
                thumb: `${marvel_res[i].thumbnail.path}.${marvel_res[i].thumbnail.extension}`

            }

        } else {

            tmp = {

                id: f_getKey(),
                name: "",
                thumb: ""

            }

        }

        data.push(tmp);

    }

    return data;

}

/*
function teste(e) {
    console.log("Teste");
    console.log(e);
}
*/

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

            if (props.whatFind) {

                setBeginNavigate(
                    {
                        start: true,
                        currentPage: 0,
                        offset: 0,
                        textToFind: props.whatFind
                    }
                );

                props.findMyHero(null);

                setNotificationMessage(
                    {
                        type: notificationType.NOTF_INFO,
                        title: "",
                        message: props.state.interface.finding.replace(/%d/, props.whatFind)
                    }
                );

            } else if (beginNavigate.textToFind) {

                if (props.whatFind==="") {

                    setNotificationMessage(null);
                    setPaginationInfo(null);
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

            }

            if (beginNavigate.start) {

                allHeroes(beginNavigate.offset, beginNavigate.textToFind).then((res) => {

                    setFormatedData(formatPagination(res.data.data.results))

                    info = {

                        offset: res.data.data.offset,
                        limit: res.data.data.limit,
                        total: res.data.data.total,
                        count: res.data.data.count
    
                    };
      
                    setPaginationInfo(
                        info
                    );

                    if (info.count)
                        setNotificationMessage(null);
                    else
                        setNotificationMessage(
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
            else
                allHeroes(0).then((res) => {
                    if (!formatedData)
                        setFormatedData(formatPagination(res.data.data.results));
                        setPaginationInfo(
                            {

                                offset: res.data.data.offset,
                                limit: res.data.data.limit,
                                total: res.data.data.total,
                                count: res.data.data.count
        
                            }
                        );

                }, (e) => {

                    if (!notificationMessage) {

                        tmp=props.state.interface.err_marvel_server_error_msg.replace(
                            /%d/,
                            e.internalError.code
                        );

                        setNotificationMessage(
                            {
                                type: notificationType.NOTF_ERROR,
                                title: `${e.err} (${(e.errTxt)})`,
                                message: tmp.replace(/%e/, e.internalError.message)
                                //message: `Erro no servidor Marvel "${e.internalError.code}" com a mensagem: ${e.internalError.message}`
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

                })

        },
        [ 
            formatedData, 
            paginationInfo, 
            stringSearchResult, 
            props.state.interface.pag_header_search_text,
            beginNavigate,
            notificationMessage,
            props,
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
                type:1,
                message
            }
        );

        setBeginNavigate(
            {
                start: true,
                currentPage: page.selected,
                offset: page.selected*THUMBNAIL_PER_PAGE,
                textToFind: beginNavigate.textToFind
            }
        )
    }

    function calculatePagination(pgInfo) {
//THUMBNAIL_PER_PAGE
/*
   {
//Usar TypeScript no futuro
        offset: '',
        limit: '',
        total: '',
        count: ''
    
    });
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
    whatFind: state.m_setFindHero
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    findMyHero: (e) => dispatch(m_findHero(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);

