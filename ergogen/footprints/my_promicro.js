// Arduino ProMicro atmega32u4au
// Params
//  orientation: default is down
//    if down, power led will face the pcb
//    if up, power led will face away from pcb

module.exports = {
  params: {
    designator: 'MCU',
    orientation: 'down',
    side: 'both',
    RAW: {type: 'net', value: 'RAW'},
    GND: {type: 'net', value: 'GND'},
    RST: {type: 'net', value: 'RST'},
    VCC: {type: 'net', value: 'VCC'},
    F4: {type: 'net', value: 'F4'},
    F5: {type: 'net', value: 'F5'},
    F6: {type: 'net', value: 'F6'},
    F7: {type: 'net', value: 'F7'},
    B1: {type: 'net', value: 'B1'},
    B3: {type: 'net', value: 'B3'},
    B2: {type: 'net', value: 'B2'},
    B6: {type: 'net', value: 'B6'},
    D3: {type: 'net', value: 'D3'},
    D2: {type: 'net', value: 'D2'},
    D1: {type: 'net', value: 'D1'},
    D0: {type: 'net', value: 'D0'},
    D4: {type: 'net', value: 'D4'},
    C6: {type: 'net', value: 'C6'},
    D7: {type: 'net', value: 'D7'},
    E6: {type: 'net', value: 'E6'},
    B4: {type: 'net', value: 'B4'},
    B5: {type: 'net', value: 'B5'}
  },
  body: p => {
    const standard = `
      (module ProMicro (layer F.Cu) (tedit 5B307E4C)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
    
      ${''/* illustration of the (possible) USB port overhang */}
      (fp_line (start -19.304 -3.81) (end -14.224 -3.81) (layer Dwgs.User) (width 0.15))
      (fp_line (start -19.304 3.81) (end -19.304 -3.81) (layer Dwgs.User) (width 0.15))
      (fp_line (start -14.224 3.81) (end -19.304 3.81) (layer Dwgs.User) (width 0.15))
      (fp_line (start -14.224 -3.81) (end -14.224 3.81) (layer Dwgs.User) (width 0.15))
    
      `;

    function silkscreen(def_neg, def_pos, side) {
      const mirror = side == 'B' ? ' (justify mirror)' : '';
      return `
        ${''/* extra border around "RAW", in case the rectangular shape is not distinctive enough */}
        (fp_line (start -15.24 ${def_pos}6.35) (end -12.7 ${def_pos}6.35) (layer ${side}.SilkS) (width 0.15))
        (fp_line (start -15.24 ${def_pos}6.35) (end -15.24 ${def_pos}8.89) (layer ${side}.SilkS) (width 0.15))
        (fp_line (start -12.7 ${def_pos}6.35) (end -12.7 ${def_pos}8.89) (layer ${side}.SilkS) (width 0.15))

        ${''/* component outline */}
        (fp_line (start -17.78 8.89) (end 15.24 8.89) (layer ${side}.SilkS) (width 0.15))
        (fp_line (start 15.24 8.89) (end 15.24 -8.89) (layer ${side}.SilkS) (width 0.15))
        (fp_line (start 15.24 -8.89) (end -17.78 -8.89) (layer ${side}.SilkS) (width 0.15))
        (fp_line (start -17.78 -8.89) (end -17.78 8.89) (layer ${side}.SilkS) (width 0.15))
      
        ${''/* pin names */}
        (fp_text user RAW (at -13.97 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user GND (at -11.43 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user RST (at -8.89 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user VCC (at -6.35 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user F4 (at -3.81 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user F5 (at -1.27 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user F6 (at 1.27 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user F7 (at 3.81 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user B1 (at 6.35 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user B3 (at 8.89 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user B2 (at 11.43 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user B6 (at 13.97 ${def_pos}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
      
        (fp_text user D3 (at -13.97 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user D2 (at -11.43 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user GND (at -8.89 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user GND (at -6.35 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user D1 (at -3.81 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user D0 (at -1.27 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user D4 (at 1.27 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user C6 (at 3.81 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user D7 (at 6.35 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user E6 (at 8.89 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user B4 (at 11.43 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
        (fp_text user B5 (at 13.97 ${def_neg}4.8 ${p.r + 90}) (layer ${side}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))${mirror}))
      `;

    }
    function pins(def_neg, def_pos) {
      return `
        ${''/* and now the actual pins */}
        (pad 1 thru_hole rect (at -13.97 ${def_pos}7.62 ${p.r}) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.RAW})
        (pad 2 thru_hole circle (at -11.43 ${def_pos}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.GND})
        (pad 3 thru_hole circle (at -8.89 ${def_pos}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.RST})
        (pad 4 thru_hole circle (at -6.35 ${def_pos}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.VCC})
        (pad 5 thru_hole circle (at -3.81 ${def_pos}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.F4})
        (pad 6 thru_hole circle (at -1.27 ${def_pos}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.F5})
        (pad 7 thru_hole circle (at 1.27 ${def_pos}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.F6})
        (pad 8 thru_hole circle (at 3.81 ${def_pos}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.F7})
        (pad 9 thru_hole circle (at 6.35 ${def_pos}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.B1})
        (pad 10 thru_hole circle (at 8.89 ${def_pos}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.B3})
        (pad 11 thru_hole circle (at 11.43 ${def_pos}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.B2})
        (pad 12 thru_hole circle (at 13.97 ${def_pos}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.B6})
        
        (pad 13 thru_hole circle (at -13.97 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.D3})
        (pad 14 thru_hole circle (at -11.43 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.D2})
        (pad 15 thru_hole circle (at -8.89 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.GND})
        (pad 16 thru_hole circle (at -6.35 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.GND})
        (pad 17 thru_hole circle (at -3.81 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.D1})
        (pad 18 thru_hole circle (at -1.27 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.D0})
        (pad 19 thru_hole circle (at 1.27 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.D4})
        (pad 20 thru_hole circle (at 3.81 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.C6})
        (pad 21 thru_hole circle (at 6.35 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.D7})
        (pad 22 thru_hole circle (at 8.89 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.E6})
        (pad 23 thru_hole circle (at 11.43 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.B4})
        (pad 24 thru_hole circle (at 13.97 ${def_neg}7.62 0) (size 1.8 1.8) (drill 1.3) (layers *.Cu *.SilkS *.Mask) ${p.B5})
      `;
    }
    const def_neg = p.orientation == 'down' ? '-' : '';
    const def_pos = p.orientation == 'down' ? '' : '-';
    if (p.side == 'both') {
      return `
        ${standard}
        ${pins(def_neg, def_pos)}
        ${silkscreen(def_neg, def_pos, 'F')}
        ${silkscreen(def_neg, def_pos, 'B')}
        )
      `;
    } else {
      return `
        ${standard}
        ${pins(def_neg, def_pos)}
        ${silkscreen(def_neg, def_pos, p.side)}
        )
        `;
    }
  }
}
