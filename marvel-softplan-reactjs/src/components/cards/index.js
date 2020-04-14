import React from 'react';
import './style.css';
import { f_getKey } from '../../utils';
import { connect } from 'react-redux';

export function Cards({ formatedData }) {

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
}

const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage
});

export default connect(mapStateToProps)(Cards);
