// TRRS-PJ-320A-dual
//
// Normal footprint:
//     _________________
//    |   (2)   (3) (4)|
//    |                |
//    | (1)            |
//    |________________|
// 
// Reverse footprint:
//     _________________
//    |   (2)   (3) (4)|
//    | (1)            |
//    | (1)            |
//    |___(2)___(3)_(4)|
//
// Reverse & symmetric footprint:
//     _________________
//    | (1|2)   (3) (4)|
//    |                |
//    |_(1|2)___(3)_(4)|
//
// Nets
//    A: corresponds to pin 1
//    B: corresponds to pin 2
//    A2: corresponds to pin 1 on bottom side in symmetric case
//    B2: corresponds to pin 2 on bottom side in symmetric case
//    C: corresponds to pin 3
//    D: corresponds to pin 4
// Params
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible
//    symmetric: default is false
//      if true, will only work if reverse is also true
//      this will cause the footprint to be symmetrical on each half
//      pins 1 and 2 must be identical if symmetric is true, as they will overlap

module.exports = {
  params: {
    designator: 'TRRS',
    reverse: false,
    symmetric: false,
    my: false,
    A: undefined,
    B: undefined,
    C: undefined,
    D: undefined
  },
  body: p => {
    const my_symmetric = `
      ${'' /* stabilizers */}
      (pad "" np_thru_hole circle (at 0 8.6) (size 1.5 1.5) (drill 1.5) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at 0 1.6) (size 1.5 1.5) (drill 1.5) (layers *.Cu *.Mask))

      ${'' /* regular pins */}
      (pad 3 thru_hole oval (at 2.3 6.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.C})
      (pad 4 thru_hole oval (at 2.3 3.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.D})
      (pad 3 thru_hole oval (at -2.3 6.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.C})
      (pad 4 thru_hole oval (at -2.3 3.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.D})

      ${'' /* double assigned pins top */}
      (pad 1 thru_hole oval (at 2.3 11.3 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.A})
      (pad 1 thru_hole oval (at 2.3 10.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.A})

      ${'' /* double assigned pins bottom */}
      (pad 2 thru_hole oval (at -2.3 11.3 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.B})
      (pad 2 thru_hole oval (at -2.3 10.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.B})

    `
    const standard = `
      (module TRRS-PJ-320A-dual (layer F.Cu) (tedit 5970F8E5)

      ${p.at /* parametric position */}   

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 14.2) (layer Dwgs.User) (effects (font (size 1 1) (thickness 0.15))))
      (fp_text value TRRS-PJ-320A-dual (at 0 -5.6) (layer F.Fab) (effects (font (size 1 1) (thickness 0.15))))

      ${''/* corner marks */}
      `
    function stabilizers(def_pos) {
      return `
        (pad "" np_thru_hole circle (at ${def_pos} 8.6) (size 1.5 1.5) (drill 1.5) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at ${def_pos} 1.6) (size 1.5 1.5) (drill 1.5) (layers *.Cu *.Mask))
      `
    }
    function pins(def_neg, def_pos) {
      return `
        (pad 1 thru_hole oval (at ${def_neg} 11.3 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.A})
        (pad 2 thru_hole oval (at ${def_pos} 10.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.B})
        (pad 3 thru_hole oval (at ${def_pos} 6.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.C})
        (pad 4 thru_hole oval (at ${def_pos} 3.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.D})
      `
    }
    if (p.my) {
      return `
        ${standard}
        ${my_symmetric})
      `
    } else if(p.reverse & p.symmetric) {
      return `
        ${standard}
        ${stabilizers('-2.3')}
        ${pins('0', '-4.6')}
        ${pins('-4.6', '0')})
      `
    } else if(p.reverse) {
        return `
          ${standard}
          ${stabilizers('-2.3')}
          ${stabilizers('0')}
          ${pins('-2.3', '2.3')}
          ${pins('0', '-4.6')})
        `
    } else {
      return `
        ${standard}
        ${stabilizers('-2.3')}
        ${pins('-4.6', '0')})
      `
    }
  }
}
