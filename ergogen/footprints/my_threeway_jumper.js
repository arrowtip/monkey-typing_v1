module.exports = {
    params: {
        designator: 'Ju3',
        side: 'F',
        from: undefined,
        to_a: undefined,
        to_b: undefined,
        
    },
    body: p => {
      const standartd = `
        (module threeway_jumper (layer F.Cu) (tedit 5E1ADAC2)
        ${p.at /* parametric position */} 

        ${'' /* footprint reference */}        
        (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value Jumper (at 0 -3) (layer F.Fab) (effects (font (size 1 1) (thickness 0.15))))

        ${'' /* pins */}
        (pad 1 smd rect (at -1.00076 0 ${p.r}) (size 0.635 1.143) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask)
        (clearance 0.1905) ${p.to_a})
        (pad 2 smd rect (at 0 0 ${p.r}) (size 0.635 1.143) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask)
        (clearance 0.1905) ${p.from})
        (pad 3 smd rect (at 1.00076 0 ${p.r}) (size 0.635 1.143) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask)
        (clearance 0.1905) ${p.to_b})
      )
    `
    const dual_side = `
        (module threeway_jumper (layer F.Cu) (tedit 5E1ADAC2)
        ${p.at /* parametric position */} 

        ${'' /* footprint reference */}        
        (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value Jumper (at 0 -3) (layer F.Fab) (effects (font (size 1 1) (thickness 0.15))))

        ${'' /* pins */}
        (pad 1 smd rect (at -1.00076 0 ${p.r}) (size 0.635 1.143) (layers F.Cu F.Paste F.Mask)
        (clearance 0.1905) ${p.to_a})
        (pad 2 smd rect (at 0 0 ${p.r}) (size 0.635 1.143) (layers F.Cu F.Paste F.Mask)
        (clearance 0.1905) ${p.from})
        (pad 3 smd rect (at 1.00076 0 ${p.r}) (size 0.635 1.143) (layers F.Cu F.Paste F.Mask)
        (clearance 0.1905) ${p.to_b})

        (pad 4 smd rect (at -1.00076 0 ${p.r}) (size 0.635 1.143) (layers B.Cu B.Paste B.Mask)
        (clearance 0.1905) ${p.to_a})
        (pad 5 smd rect (at 0 0 ${p.r}) (size 0.635 1.143) (layers B.Cu B.Paste B.Mask)
        (clearance 0.1905) ${p.from})
        (pad 6 smd rect (at 1.00076 0 ${p.r}) (size 0.635 1.143) (layers B.Cu B.Paste B.Mask)
        (clearance 0.1905) ${p.to_b})

        (pad 7 thru_hole circle (at -1.00076 0) (size 0.6 0.6) (drill 0.3) (layers *.Cu) (zone_connect 2) ${p.to_a})
        (pad 8 thru_hole circle (at 0 0) (size 0.6 0.6) (drill 0.3) (layers *.Cu) (zone_connect 2) ${p.from})
        (pad 9 thru_hole circle (at 1.00076 0) (size 0.6 0.6) (drill 0.3) (layers *.Cu) (zone_connect 2) ${p.to_b})
      )
    `
    if (p.side == 'both') {
      return dual_side
    } else {
      return standartd
    }
  }
}
