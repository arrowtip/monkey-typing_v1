//
// Use with following structure for automatic version number:
//
//  params:
//    $extends: meta
//
// It's a bit sketchy but it works.
//
//
module.exports = {
  params: {
    designator: 'Ver',
    side: 'F',
    version: '',
    engine: '',
    author: '',
  },
  body: p => `
    (module VersionNumber (layer F.Cu) (tedit 5B24D78E)
      ${p.at /* parametric position */}
      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "${p.version}" (at 0 0) (layer ${p.side}.SilkS) (effects (font (size 1.75 1.75) (thickness 0.5))))
    )
    `
}
