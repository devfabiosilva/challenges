import React, { useEffect, useState } from 'react';
import './style.css';
import { f_getKey } from '../../utils';
import { allHeroes } from './../../service/api';
import Notification from '../notification';
import { connect } from 'react-redux';

function formatPagination(marvel_res) {

    let data = [];
    let tmp = null;
    let i;
    let marvel_res_len = marvel_res.length-1;

    for (i = 0 ; i < 8 ; i++ ) {

        if (i <= marvel_res_len){
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

export function Cards(props) {

    const [ formatedData, setFormatedData ] = useState(null);

    useEffect(
        () => {

                allHeroes(10).then((res) => {

                    if (!formatedData)
                        setFormatedData(formatPagination(res.data.data.results));
                    
                    console.log(formatedData);

                }, (e) => console.log(e))
        }, [formatedData]
    )

    if (formatedData)
    return (
        <div className="main-card-container">
            <div className="container-row">
            {
                formatedData.map((val, idx) => {
                    if (idx<4)
                        if (val.name) {
                            return (
                                <div key={val.id} className="card-container">
                                    <div key={f_getKey()} className="card-thumbnail">
                                        <img 
                                            key={f_getKey()}
                                            src={val.thumb}
                                            alt="imagecard"
                                            className="card-img"
                                        />
                                    </div>
                                    <div key={f_getKey()} className="card-name">
                                        <p key={f_getKey()}>
                                            { val.name }
                                        </p>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={val.id} className="card-container"></div>                                );
                        }
                    else
                        return null
                })
            }
            </div>
            <div className="container-row">
            {

                formatedData.map((val, idx) => {
                    if (idx>3)
                        if (val.name) {
                            return (
                                <div key={val.id} className="card-container">
                                    <div key={f_getKey()} className="card-thumbnail">
                                        <img 
                                            key={f_getKey()}
                                            src={val.thumb}
                                            alt="imagecard"
                                            className="card-img"
                                        />
                                    </div>
                                    <div key={f_getKey()} className="card-name">
                                        <p key={f_getKey()}>
                                            { val.name }
                                        </p>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={val.id} className="card-container"></div>
                            );
                        }
                    else
                        return null
            })
            }
            </div>
        </div>
    );
    else 
        return(
            <div
                className="main-card-container"
                style={
                    {
                        display: "flex",
                        justifyContent: "center"}
                    }>
                <Notification>{ props.state.interface.loading_characters }</Notification>
            </div>
        )
}

const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage
});

export default connect(mapStateToProps)(Cards);
