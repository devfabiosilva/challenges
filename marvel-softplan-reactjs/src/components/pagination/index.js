import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import Cards from '../cards';
import { f_getKey } from '../../utils';
import { allHeroes } from './../../service/api';
import Notification from '../notification';
import './style.css';

const THUMBNAIL_PER_PAGE = 8;

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
    const [ beginNavigate, setBeginNavigate ] = useState(
        {
            start: false,
            currentPage: 0,
            offset: 0
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

            if (beginNavigate.start) {

                allHeroes(beginNavigate.offset).then((res) => {

                    setFormatedData(formatPagination(res.data.data.results));


                    info = {

                        offset: res.data.data.offset,
                        limit: res.data.data.limit,
                        total: res.data.data.total,
                        count: res.data.data.count
    
                    };
                    
                    setPaginationInfo(
                        info
                    );

                    setNotificationMessage(null);

                }, (e) => console.log(e));

                setBeginNavigate(
                    {
                        start: false,
                        currentPage: beginNavigate.currentPage,
                        offset: beginNavigate.offset
                    }
                )

            }

            if (paginationInfo)
                setStringSearchResult(formatStringSearchResult());
            else
                allHeroes(0).then((res) => {

                    if (!formatedData)
                        setFormatedData(formatPagination(res.data.data.results));

                    if (!paginationInfo) {

                        info = {

                            offset: res.data.data.offset,
                            limit: res.data.data.limit,
                            total: res.data.data.total,
                            count: res.data.data.count
    
                        };
                    
                        setPaginationInfo(
                            info
                        );

                    }

                }, (e) => console.log(e))
console.log("AA")
        },
        [ 
            formatedData, 
            paginationInfo, 
            stringSearchResult, 
            props.state.interface.pag_header_search_text,
            beginNavigate,
            notificationMessage
        ]
    
    )

    function startPageNavigation(page) {

        let message;
        
        if (page.selected===beginNavigate.currentPage)
            return;

        message = props.state.interface.loading_page.replace(/%d/, page.selected+1);

        message = message.replace(/%e/, pageData.numberOfPages);

        setNotificationMessage(message);

        setBeginNavigate(
            {
                start: true,
                currentPage: page.selected,
                offset: page.selected*THUMBNAIL_PER_PAGE,
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

                <Notification>

                    { notificationMessage }

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

                        initialPage={ beginNavigate.currentPage }

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
    state: state.m_setLanguage
});

export default connect(mapStateToProps)(Paginate);

