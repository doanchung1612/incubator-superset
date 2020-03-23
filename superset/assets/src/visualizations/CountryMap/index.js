/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { t } from '@superset-ui/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/chart';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';

// eslint-disable-next-line no-underscore-dangle
function _inheritsLoose(a, b) {
    a.prototype = Object.create(b.prototype), a.prototype.constructor = a, a.__proto__ = b;
}

const metadata = new ChartMetadata({
    credits: ['https://bl.ocks.org/john-guerra'],
    description: '',
    name: t('Country Map'),
    thumbnail,
    useLegacyApi: !0,
});
const CountryMapChartPlugin = /* #__PURE__ */(function (a) {
    function b() {
        return a.call(this, {
            loadChart: function loadChart() {
                return import('./ReactCountryMap.js');
            },
            metadata,
            transformProps,
        }) || this;
    }

    return _inheritsLoose(b, a) , b;
}(ChartPlugin));
export { CountryMapChartPlugin as default };