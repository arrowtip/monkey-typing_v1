module.exports = {
    params: {
        designator: 'Ju3',
        side: 'F',
        from: undefined,
        to_a: undefined,
        to_b: undefined,
        
    },
    body: p => {
      const pads = (side) => {
        return `
        ${'' /* pads */}
        (pad 1 smd rect (at -1.00076 0 ${p.r}) (size 0.635 1.143) (layers ${side}.Cu ${side}.Paste ${side}.Mask)
        (clearance 0.1905) ${p.to_a})
        (pad 2 smd rect (at 0 0 ${p.r}) (size 0.635 1.143) (layers ${side}.Cu ${side}.Paste ${side}.Mask)
        (clearance 0.1905) ${p.from})
        (pad 3 smd rect (at 1.00076 0 ${p.r}) (size 0.635 1.143) (layers ${side}.Cu ${side}.Paste ${side}.Mask)
        (clearance 0.1905) ${p.to_b})
        `;
      };
      const silkscreen = (side) => {
        return `
        (fp_line (start -1.4 -0.75) (end 1.4 -0.75)
          (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start -1.4 0.75) (end 1.4 0.75)
          (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))
        `;
      };
      const vias = `
        (via
          (at ${p.x - Math.cos(p.r / 360 * 2 * Math.PI) * 1.00076} ${p.y + Math.sin(p.r / 360 * 2 * Math.PI) * 1.00076})
          (size 0.6)
          (drill 0.3)
          (layers "F.Cu" "B.Cu")
          (net ${p.to_a.index})
        )
        (via
          (at ${p.x} ${p.y})
          (size 0.6)
          (drill 0.3)
          (layers "F.Cu" "B.Cu")
          (net ${p.from.index})
        )
        (via
          (at ${p.x + Math.cos(p.r / 360 * 2 * Math.PI) * 1.00076} ${p.y - Math.sin(p.r / 360 * 2 * Math.PI) * 1.00076})
          (size 0.6)
          (drill 0.3)
          (layers "F.Cu" "B.Cu")
          (net ${p.to_b.index})
        )
      `;



    if (p.side == 'both') {
      return `
        (module threeway_jumper (layer F.Cu) (tedit 5E1ADAC2)
        ${p.at /* parametric position */} 
        ${'' /* footprint reference */}        
        (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value Jumper (at 0 -3) (layer F.Fab) (effects (font (size 1 1) (thickness 0.15))))

        ${p.side == 'both' ? `${pads('F')} ${pads('B')}` : pads(p.side)}
        ${p.side == 'both' ? `${silkscreen('F')} ${silkscreen('B')}` : silkscreen(p.side)}
        )
        ${p.side == 'both' ? vias : ''}
      `
    } 
  }
}
