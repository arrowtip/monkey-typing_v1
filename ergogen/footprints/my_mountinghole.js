// MountingHole_2.2mm_M2_Pad_Via
// TODO add more sizes as param?
module.exports = {
    params: {
        class: 'HOLE',
    },
    body: p => `
    (module "MountingHole_2.2mm_M2" (version 20210722) (generator pcbnew) (layer "F.Cu")
      (tedit 56DDB9C7)
      ${p.at /* parametric position */} 

      (fp_text reference "${p.ref}" (at 0 -3.2) (layer "F.SilkS") ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
        (tstamp b68bb25c-687d-44b1-b966-dad4cac66b35)
      )

      (fp_circle (center 0 0) (end 2.2 0) (layer "Cmts.User") (width 0.15) (fill none) (tstamp 71a75880-cf5a-43ab-8b1d-f44c01445e60))
      (fp_circle (center 0 0) (end 2.45 0) (layer "F.CrtYd") (width 0.05) (fill none) (tstamp 26215474-47bd-447f-8eae-506283663b32))
      (pad "" np_thru_hole circle (at 0 0) (size 2.2 2.2) (drill 2.2) (layers *.Cu *.Mask) (tstamp 0883009e-86d7-4102-a9c0-b93d0d81b320))
    )`
}
