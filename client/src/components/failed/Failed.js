import React, { Component } from 'react';

class Failed extends Component {
    render() {
        return (
            <div className="failed">
                <div className="card failed-msg">
                    <h1>404! الصفحة المطلوبة غبر متوفرة</h1>
                    <button className="btn btn-primary" onClick = {
                        () => {
                            window.location.href = '/studenthome'
                        }
                    }>العودة الى الصفحة الرئيسية</button>
                </div>
            </div>
        );
    }
}

export default Failed;