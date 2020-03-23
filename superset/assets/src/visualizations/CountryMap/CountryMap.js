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

// eslint-disable-next-line import/no-extraneous-dependencies
import d3 from 'd3/d3';

import PropTypes from 'prop-types';
import { extent as d3Extent } from 'd3-array';
import { getSequentialSchemeRegistry } from '@superset-ui/color';
import { getNumberFormatter } from '@superset-ui/number-format';
import countries from './countries';
import './CountryMap.css';

const propTypes = {
    // eslint-disable-next-line max-len
    data: PropTypes.arrayOf(PropTypes.shape({ country_id: PropTypes.string, metric: PropTypes.number })),
    width: PropTypes.number,
    height: PropTypes.number,
    country: PropTypes.string,
    linearColorScheme: PropTypes.string,
    mapBaseUrl: PropTypes.string,
    numberFormat: PropTypes.string,
};
const
    maps = {};

function CountryMap(a, b) {
    function c(a) {
        const b = a.features;
        const c = d3.geo.centroid(a);
        const e = 100;
        const g = d3.geo.mercator().scale(e).center(c).translate([f / 2, h / 2]);
        q.projection(g);// Compute scale that fits container.
        const i = q.bounds(a);
        const j = e * f / (i[1][0] - i[0][0]);
        const k = e * h / (i[1][1] - i[0][1]);
        const
            l = j < k ? j : k;
        g.scale(l);
        const m = q.bounds(a);// Draw each province as a path
        g.translate([f - (m[0][0] + m[1][0]) / 2, h - (m[0][1] + m[1][1]) / 2]), d.selectAll('path').data(b).enter().append('path')
            .attr('d', q)
            .attr('class', 'region')
            .attr('vector-effect', 'non-scaling-stroke')
            .style('fill', p)
            .on('mouseenter', D)
            .on('mouseout', E)
            .on('click', A);
    }

    const e = b.data;
    let f = b.width;
    let h = b.height;
    const i = b.country;
    const j = b.linearColorScheme;
    const k = b.numberFormat;
    const l = a;
    const m = getNumberFormatter(k);
    const n = getSequentialSchemeRegistry().get(j).createLinearScale(d3Extent(e, function (a) {
        return a.metric;
    }));
    const
        o = {};
    e.forEach(function (a) {
        o[a.country_id] = n(a.metric);
    });
    let p = function (a) {
        return o[a.properties.ISO] || 'none';
    };

    let q = d3.geo.path();
    const
        r = d3.select(l);
    r.classed('superset-legacy-chart-country-map', !0), r.selectAll('*').remove(), l.style.height = h + 'px', l.style.width = f + 'px';
    let s;
    const t = r.append('svg:svg').attr('width', f).attr('height', h).attr('preserveAspectRatio', 'xMidYMid meet');
    const u = t.append('rect').attr('class', 'background').attr('width', f).attr('height', h);
    const v = t.append('g');
    let d = v.append('g').classed('map-layer', !0);
    const g = v.append('g').classed('text-layer', !0).attr('transform', 'translate(' + f / 2 + ', 45)');
    // console.log(g);
    const w = g.append('text').classed('big-text', !0);
    const z = g.append('text').classed('result-text', !0).attr('dy', '1em');
    let A = function (a) {
        let b;
        let c;
        let d;
        const e = a && s !== a;
        const i = f / 2;
        const
            j = h / 2;
        if (e) {
            const l = q.centroid(a);
            b = l[0], c = l[1], d = 4, s = a;
        } else b = i, c = j, d = 1, s = null;
        v.transition().duration(750).attr('transform', 'translate(' + i + ',' + j + ')scale(' + d + ')translate(' + -b + ',' + -c + ')'), g.style('opacity', 0).attr('transform', 'translate(0,0)translate(' + b + ',' + (e ? c - 5 : 45) + ')').transition().duration(750)
            .style('opacity', 1), w.transition().duration(750).style('font-size', e ? 6 : 16), z.transition().duration(750).style('font-size', e ? 16 : 24);
    };
    u.on('click', A);
    const B = function (a) {
        let b = '';
        a && a.properties && (a.properties.ID_2 ? b = a.properties.NAME_2 : b = a.properties.NAME_1), w.text(b);
    };
    const C = function (a) {
        a.length > 0 && z.text(m(a[0].metric));
    };
    let D = function (a) { // Darken color
        let b = p(a);
        b !== 'none' && (b = d3.rgb(b).darker().toString()), d3.select(this).style('fill', b), B(a);
        const d = e.filter(function (b) {
            return b.country_id === a.properties.ISO;
        });
        C(d);
    };
    let E = function () {
        d3.select(this).style('fill', p), w.text(''), z.text('');
    };
    const F = i.toLowerCase();
    const
        G = maps[F];
    if (G) c(G); else {
        const H = countries[F];
        d3.json(H, function (a, b) {
            a || (maps[F] = b, c(b));
        });
    }
}

// eslint-disable-next-line no-unused-expressions,no-sequences
CountryMap.displayName = 'CountryMap', CountryMap.propTypes = propTypes;
export default CountryMap;
