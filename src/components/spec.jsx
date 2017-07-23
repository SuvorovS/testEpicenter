import React from 'react';

import './spec.scss';

function Spec() {
    return (
        <div className="spec">
            <div className="spec__inner">
                <div className="spec__header">
                    <h3>
                        заголовок спека
                    </h3>
                </div>
                <div className="spec__main">
                    <table cellSpacing='0'>
                        <thead>
                            <tr>
                                <th>название</th>
                                <th>значение</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>спецификация</td>
                                <td>значене</td>       
                            </tr>
                            <tr>
                                <td>спецификация</td>
                                <td>значене</td>       
                            </tr>
                            <tr>
                                <td>спецификация</td>
                                <td>значене</td>       
                            </tr>
                            <tr>
                                <td>спецификация</td>
                                <td>значене</td>       
                            </tr>
                            <tr>
                                <td>спецификация</td>
                                <td>значене</td>       
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                <div className="spec__footer">
                    footer
                </div>
            </div>
        </div>
    );
};

export default Spec;