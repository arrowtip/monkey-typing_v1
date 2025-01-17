// Any MX switch
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    hotswap: default is false
//      if true, will include holes and pads for Kailh MX hotswap sockets
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible 
//    keycaps: default is false
//      if true, will add choc sized keycap box around the footprint
//
// note: hotswap and reverse can be used simultaneously

module.exports = {
  params: {
    designator: 'S',
    keycaps: false,
    preroute: false,
    trace_width: 0.5,
    top_vert: false,
    from: undefined,
    to: undefined
  },
  body: p => {
    const standard = `
      (module MX (layer F.Cu) (tedit 5DD4F656)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${''/* corner marks */}
      (fp_line (start -7 -6) (end -7 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -7 7) (end -6 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -6 -7) (end -7 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -7 7) (end -7 6) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 6) (end 7 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 -7) (end 6 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 6 7) (end 7 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 -7) (end 7 -6) (layer Dwgs.User) (width 0.15))
    
      ${''/* middle shaft */}
      (pad "" np_thru_hole circle (at 0 0) (size 3.9878 3.9878) (drill 3.9878) (layers *.Cu *.Mask))

      ${''/* stabilizers */}
      (pad "" np_thru_hole circle (at 5.08 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at -5.08 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))

      ${''/* diode symbols */}
      (fp_line (start 0.25 5) (end 0.75 5) (layer F.SilkS) (width 0.1))
      (fp_line (start 0.25 5.4) (end -0.35 5) (layer F.SilkS) (width 0.1))
      (fp_line (start 0.25 4.6) (end 0.25 5.4) (layer F.SilkS) (width 0.1))
      (fp_line (start -0.35 5) (end 0.25 4.6) (layer F.SilkS) (width 0.1))
      (fp_line (start -0.35 5) (end -0.35 5.55) (layer F.SilkS) (width 0.1))
      (fp_line (start -0.35 5) (end -0.35 4.45) (layer F.SilkS) (width 0.1))
      (fp_line (start -0.75 5) (end -0.35 5) (layer F.SilkS) (width 0.1))
      (fp_line (start 0.25 5) (end 0.75 5) (layer B.SilkS) (width 0.1))
      (fp_line (start 0.25 5.4) (end -0.35 5) (layer B.SilkS) (width 0.1))
      (fp_line (start 0.25 4.6) (end 0.25 5.4) (layer B.SilkS) (width 0.1))
      (fp_line (start -0.35 5) (end 0.25 4.6) (layer B.SilkS) (width 0.1))
      (fp_line (start -0.35 5) (end -0.35 5.55) (layer B.SilkS) (width 0.1))
      (fp_line (start -0.35 5) (end -0.35 4.45) (layer B.SilkS) (width 0.1))
      (fp_line (start -0.75 5) (end -0.35 5) (layer B.SilkS) (width 0.1))
  
      ${''/* SMD pads on both sides */}
      (pad 1 smd rect (at -1.65 5 ${p.r}) (size 0.9 1.2) (layers F.Cu F.Paste F.Mask) ${p.to})
      (pad 2 smd rect (at 1.65 5 ${p.r}) (size 0.9 1.2) (layers B.Cu B.Paste B.Mask) ${p.from})
      (pad 1 smd rect (at -1.65 5 ${p.r}) (size 0.9 1.2) (layers B.Cu B.Paste B.Mask) ${p.to})
      (pad 2 smd rect (at 1.65 5 ${p.r}) (size 0.9 1.2) (layers F.Cu F.Paste F.Mask) ${p.from})
      
      ${''/* THT terminals */}
      (pad 1 thru_hole rect (at -3.81 5 ${p.r}) (size 1.778 1.778) (drill 0.9906) (layers *.Cu *.Mask) ${p.to})
      (pad 2 thru_hole circle (at 3.81 5 ${p.r}) (size 1.905 1.905) (drill 0.9906) (layers *.Cu *.Mask) ${p.from})
      `
    const get_at_coordinates = () => {
        const pattern = /\(at (-?[\d\.]*) (-?[\d\.]*) (-?[\d\.]*)\)/;
        const matches = p.at.match(pattern);
        if (matches && matches.length == 4) {
            return [parseFloat(matches[1]), parseFloat(matches[2]), parseFloat(matches[3])];
        } else {
            return null;
        }
    }

    const adjust_point = (x, y) => {
        const at_l = get_at_coordinates();
        if(at_l == null) {
            throw new Error(
            `Could not get x and y coordinates from p.at: ${p.at}`
            );
        }
        const at_x = at_l[0];
        const at_y = at_l[1];
        const at_angle = at_l[2];
        const adj_x = at_x + x;
        const adj_y = at_y + y;

        const radians = (Math.PI / 180) * at_angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (adj_x - at_x)) + (sin * (adj_y - at_y)) + at_x,
            ny = (cos * (adj_y - at_y)) - (sin * (adj_x - at_x)) + at_y;

        const point_str = `${nx.toFixed(5)} ${ny.toFixed(5)}`;
        return point_str;
    }

    const vertical = p.top_vert ? 'F' : 'B';
    const horizontal = p.top_vert ? 'B' : 'F';

    const traces = `
      ${'' /* pre-routed traces */}
      (segment
        (start ${adjust_point(-2.54, -5.08)})
        (end ${adjust_point(2.54, -5.08)})
        (width ${p.trace_width})
        (layer "${horizontal}.Cu")
        (net 1)
        (uuid "2e32c383-39ce-48c0-8ce3-677e15c4e9cb")
      )
      (segment
        (start ${adjust_point(1.65, 5)})
        (end ${adjust_point(3.81, 5)})
        (width ${p.trace_width})
        (layer "${horizontal}.Cu")
        (net 1)
        (uuid "4a742bc9-3293-47ce-a052-8e5f959b1a13")
      )
      (segment
        (start ${adjust_point(5.5, -5.08)})
        (end ${adjust_point(7, -3.58)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 1)
        (uuid "04051827-353d-47d3-8307-5584db720750")
      )
      (segment
        (start ${adjust_point(5.5, 5)})
        (end ${adjust_point(3.81, 5)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 1)
        (uuid "17333954-49ed-4cf1-8d2e-541d29de2d5a")
      )
      (segment
        (start ${adjust_point(2.54, -5.08)})
        (end ${adjust_point(5.5, -5.08)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 1)
        (uuid "3b961bd3-53df-4f76-87ae-d0f07e1a7ca4")
      )
      (segment
        (start ${adjust_point(7, 3.5)})
        (end ${adjust_point(5.5, 5)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 1)
        (uuid "b73cc636-03d8-4d25-9eca-06e4727e5524")
      )
      (segment
        (start ${adjust_point(7, -3.58)})
        (end ${adjust_point(7, 3.5)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 1)
        (uuid "c8979a4e-ab62-4470-acc9-d872f5566600")
      )
      (segment
        (start ${adjust_point(1.65, 5)})
        (end ${adjust_point(3.81, 5)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 1)
        (uuid "f9649227-c88f-4b4e-8f6e-21b3f3541647")
      )
      (segment
        (start ${adjust_point(-3.81, 5)})
        (end ${adjust_point(-1.65, 5)})
        (width ${p.trace_width})
        (layer "${horizontal}.Cu")
        (net 2)
        (uuid "42a1c0ad-63cc-41b2-b95a-8f557e857d7a")
      )
      (segment
        (start ${adjust_point(-3.81, -2.54)})
        (end ${adjust_point(3.81, -2.54)})
        (width ${p.trace_width})
        (layer "${horizontal}.Cu")
        (net 2)
        (uuid "89f4c8e6-5177-4845-bd85-92468f2ae41c")
      )
      (segment
        (start ${adjust_point(-3.81, 5)})
        (end ${adjust_point(-1.65, 5)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 2)
        (uuid "09626349-4e24-4a3a-86b3-2eb26870fd33")
      )
      (segment
        (start ${adjust_point(-5.5, 5)})
        (end ${adjust_point(-7, 3.5)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 2)
        (uuid "219036c7-9268-4ee6-8fa0-696ddb35438b")
      )
      (segment
        (start ${adjust_point(-7, 3.5)})
        (end ${adjust_point(-7, -1.04)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 2)
        (uuid "9f7542e1-6610-43bf-920a-809a4e31732a")
      )
      (segment
        (start ${adjust_point(-3.81, 5)})
        (end ${adjust_point(-5.5, 5)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 2)
        (uuid "ae29a401-5e62-452e-bbab-1df74fc8365f")
      )
      (segment
        (start ${adjust_point(-5.5, -2.54)})
        (end ${adjust_point(-3.81, -2.54)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 2)
        (uuid "d04449ea-bc1f-43f8-b8bd-dc61319a353a")
      )
      (segment
        (start ${adjust_point(-7, -1.04)})
        (end ${adjust_point(-5.5, -2.54)})
        (width ${p.trace_width})
        (layer "${vertical}.Cu")
        (net 2)
        (uuid "d8abb820-064f-4a06-9f04-49a2c714df32")
      )

    `

    const keycap = `
      ${'' /* keycap marks */}
      (fp_line (start -9.5 -9.5) (end 9.5 -9.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9.5 -9.5) (end 9.5 9.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start 9.5 9.5) (end -9.5 9.5) (layer Dwgs.User) (width 0.15))
      (fp_line (start -9.5 9.5) (end -9.5 -9.5) (layer Dwgs.User) (width 0.15))
      `
    function pins(def_neg, def_pos, def_side) {
      if(p.hotswap) {
        return `
        ${'' /* holes */}
        (pad "" np_thru_hole circle (at ${def_pos}2.54 -5.08) (size 3 3) (drill 3) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at ${def_neg}3.81 -2.54) (size 3 3) (drill 3) (layers *.Cu *.Mask))
        
        ${'' /* net pads */}
        (pad 1 smd rect (at ${def_neg}7.085 -2.54 ${p.r}) (size 2.55 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${p.from})
        (pad 2 smd rect (at ${def_pos}5.842 -5.08 ${p.r}) (size 2.55 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${p.to})
        `
      } else {
          return `
            ${''/* pins */}
            (pad 1 thru_hole circle (at ${def_pos}2.54 -5.08) (size 2.286 2.286) (drill 1.4986) (layers *.Cu *.Mask) ${p.from})
            (pad 2 thru_hole circle (at ${def_neg}3.81 -2.54) (size 2.286 2.286) (drill 1.4986) (layers *.Cu *.Mask) ${p.to})
          `
      }
    }

    if (p.preroute) {
      return `
        ${standard}
        ${p.keycaps ? keycap : ''}
        ${pins('-', '', 'B')}
        ${pins('', '-', 'F')})
        ${traces}
        `
    } else {
      return `
        ${standard}
        ${p.keycaps ? keycap : ''}
        ${pins('-', '', 'B')}
        ${pins('', '-', 'F')})
        `
    }
  }
}
