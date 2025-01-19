module.exports = {
    params: {
        designator: 'R',
        from: undefined,
        to: undefined
    },
    body: p => `
  
    (module ComboResistor (layer F.Cu) (tedit 5B24D78E)


        ${p.at /* parametric position */}

        ${'' /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
        
        ${''/* resistor symbols */}
        (fp_line (start -0.227064 -0.735) (end 0.227064 -0.735)
          (stroke (width 0.12) (type solid)) (layer "F.SilkS"))
        (fp_line (start -0.227064 0.735) (end 0.227064 0.735)
          (stroke (width 0.12) (type solid)) (layer "F.SilkS"))
        (fp_line (start -0.227064 -0.735) (end 0.227064 -0.735)
          (stroke (width 0.12) (type solid)) (layer "B.SilkS"))
        (fp_line (start -0.227064 0.735) (end 0.227064 0.735)
          (stroke (width 0.12) (type solid)) (layer "B.SilkS"))

        (fp_line (start -1.85 -0.95) (end 1.85 -0.95)
          (stroke (width 0.05) (type solid)) (layer "F.CrtYd"))
        (fp_line (start -1.85 0.95) (end -1.85 -0.95)
          (stroke (width 0.05) (type solid)) (layer "F.CrtYd"))
        (fp_line (start 1.85 -0.95) (end 1.85 0.95)
          (stroke (width 0.05) (type solid)) (layer "F.CrtYd"))
        (fp_line (start 1.85 0.95) (end -1.85 0.95)
          (stroke (width 0.05) (type solid)) (layer "F.CrtYd"))
        (fp_line (start -1.85 -0.95) (end 1.85 -0.95)
          (stroke (width 0.05) (type solid)) (layer "B.CrtYd"))
        (fp_line (start -1.85 0.95) (end -1.85 -0.95)
          (stroke (width 0.05) (type solid)) (layer "B.CrtYd"))
        (fp_line (start 1.85 -0.95) (end 1.85 0.95)
          (stroke (width 0.05) (type solid)) (layer "B.CrtYd"))
        (fp_line (start 1.85 0.95) (end -1.85 0.95)
          (stroke (width 0.05) (type solid)) (layer "B.CrtYd"))

        (fp_line (start -1 -0.625) (end 1 -0.625)
          (stroke (width 0.1) (type solid)) (layer "F.Fab"))
        (fp_line (start -1 0.625) (end -1 -0.625)
          (stroke (width 0.1) (type solid)) (layer "F.Fab"))
        (fp_line (start 1 -0.625) (end 1 0.625)
          (stroke (width 0.1) (type solid)) (layer "F.Fab"))
        (fp_line (start 1 0.625) (end -1 0.625)
          (stroke (width 0.1) (type solid)) (layer "F.Fab"))
        (fp_line (start -1 -0.625) (end 1 -0.625)
          (stroke (width 0.1) (type solid)) (layer "B.Fab"))
        (fp_line (start -1 0.625) (end -1 -0.625)
          (stroke (width 0.1) (type solid)) (layer "B.Fab"))
        (fp_line (start 1 -0.625) (end 1 0.625)
          (stroke (width 0.1) (type solid)) (layer "B.Fab"))
        (fp_line (start 1 0.625) (end -1 0.625)
          (stroke (width 0.1) (type solid)) (layer "B.Fab"))
    
        ${''/* SMD pads on both sides */}
        (pad 1 smd roundrect (at -1 0 ${p.r}) (size 1.2 1.4) 
          (layers F.Cu F.Paste F.Mask) (roundrect_rratio 0.208333) ${p.to})
        (pad 2 smd roundrect (at 1 0 ${p.r}) (size 1.2 1.4) 
          (layers B.Cu B.Paste B.Mask) (roundrect_rratio 0.208333) ${p.from})
        (pad 1 smd roundrect (at -1 0 ${p.r}) (size 1.2 1.4) 
          (layers B.Cu B.Paste B.Mask) (roundrect_rratio 0.208333) ${p.to})
        (pad 2 smd roundrect (at 1 0 ${p.r}) (size 1.2 1.4) 
          (layers F.Cu F.Paste F.Mask) (roundrect_rratio 0.208333) ${p.from})
        
        ${''/* THT terminals */}
        (pad 1 thru_hole circle (at -3.81 0 ${p.r}) (size 1.778 1.778) (drill 0.9906) (layers *.Cu *.Mask) ${p.to})
        (pad 2 thru_hole circle (at 3.81 0 ${p.r}) (size 1.905 1.905) (drill 0.9906) (layers *.Cu *.Mask) ${p.from})
    )
  
    `
}
