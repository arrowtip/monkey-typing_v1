// MountingHole_2.2mm_M2_Pad_Via
// TODO add more sizes as param?
module.exports = {
    params: {
        class: 'HOLE',
        size: 'M3',
    },
    body: p => {
      const m2 = `
    (module "MountingHole_2.2mm_M2" (version 20210722) (generator pcbnew) (layer "F.Cu")
      (tedit 56DDB9C7)
      ${p.at /* parametric position */} 

      (fp_text reference "${p.ref}" (at 0 -3.2) (layer "F.SilkS") ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
        (tstamp b68bb25c-687d-44b1-b966-dad4cac66b35)
      )

    (attr exclude_from_pos_files exclude_from_bom)
    (fp_circle
      (center 0 0)
      (end 1.9 0)
      (stroke
        (width 0.15)
        (type solid)
      )
      (fill none)
      (layer "Cmts.User")
      (uuid "25e60c30-c624-4df4-a7c5-120301308130")
    )
    (fp_circle
      (center 0 0)
      (end 2.15 0)
      (stroke
        (width 0.05)
        (type solid)
      )
      (fill none)
      (layer "F.CrtYd")
      (uuid "2ce6d3de-4552-4923-b122-afa6f194b79f")
    )
    (pad "" thru_hole circle
      (at 0 0)
      (size 3.8 3.8)
      (drill 2.2)
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
      (uuid "09a1171c-5923-4d70-9fb7-dde883bdb35f")
    )

    )`
      const m3 = `
    (module "MountingHole_3.2mm_M3" (version 20210722) (generator pcbnew) (layer "F.Cu")
      (tedit 56DDB9C7)
      ${p.at /* parametric position */} 

      (fp_text reference "${p.ref}" (at 0 -3.2) (layer "F.SilkS") ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
        (tstamp b68bb25c-687d-44b1-b966-dad4cac66b35)
      )

    (attr exclude_from_pos_files exclude_from_bom)
    (fp_circle
      (center 0 0)
      (end 2.85 0)
      (stroke
        (width 0.15)
        (type solid)
      )
      (fill none)
      (layer "Cmts.User")
      (uuid "b931dbf0-25f2-4828-a7b5-ca7ba98beb6e")
    )
    (fp_circle
      (center 0 0)
      (end 3.1 0)
      (stroke
        (width 0.05)
        (type solid)
      )
      (fill none)
      (layer "F.CrtYd")
      (uuid "65572c95-6054-45c1-aa2f-fc8fa0cde2d2")
    )
    (pad "" thru_hole circle
      (at 0 0)
      (size 5.7 5.7)
      (drill 3.2)
      (layers "*.Cu" "*.Mask")
      (remove_unused_layers no)
      (uuid "17b7df9b-a857-4080-839c-f678c4f420d2")
    )
    )`

    if (p.size == 'm3') {
      return m3
    } else {
      return m2
    }
  }
}
