/* The Turn: fill a workbook PDF with a learner's answers. Runs in the browser (window.PDFLib) and in node for tests. */
(function (root) {
  var MAP = { watch_fork: 'fork', recall_words: 'words', reflect_kq: 'kq', reflect_door: 'door', relate_rep: 'rep', refine_changed: 'changed', release_stack: 'stack', release_felt: 'felt' };
  function clean(s) { return String(s || '').replace(/\r/g, '').replace(/[^\x09\x0A\x20-\x7E -ÿ‘’“”–—…•]/g, '').trim(); }
  function fit(field, txt) {
    var r = field.acroField.getWidgets()[0].getRectangle();
    for (var s = 11; s >= 6.5; s -= 0.5) {
      var cpl = Math.max(1, Math.floor((r.width - 4) / (s * 0.52))), cap = Math.floor((r.height - 4) / (s * 1.2)), n = 0;
      txt.split('\n').forEach(function (p) { n += Math.max(1, Math.ceil(p.length / cpl)); });
      if (n <= cap) return s;
    }
    return 6.5;
  }
  async function fillWorkbook(PDFLib, bytes, ans) {
    var doc = await PDFLib.PDFDocument.load(bytes, { updateMetadata: false });
    var form = doc.getForm(), font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
    Object.keys(MAP).forEach(function (name) {
      var v = clean(ans[MAP[name]]); if (!v) return;
      var f = form.getTextField(name); f.setFontSize(fit(f, v)); f.setText(v);
    });
    [1, 2].forEach(function (d) {
      var w = clean(ans['six' + d]).split(/\s+/).filter(Boolean); if (!w.length) return;
      var parts = w.slice(0, 5); if (w.length > 5) parts.push(w.slice(5).join(' '));
      parts.forEach(function (x, i) { var f = form.getTextField('refine_d' + d + '_' + (i + 1)); f.setFontSize(x.length > 11 ? 8 : 11); f.setText(x); });
    });
    if (ans.pillar) { try { form.getCheckBox('pillar_' + ans.pillar).check(); } catch (e) {} }
    form.updateFieldAppearances(font);
    form.acroForm.dict.set(PDFLib.PDFName.of('NeedAppearances'), PDFLib.PDFBool.False);
    return doc.save();
  }
  root.TurnWorkbook = { fillWorkbook: fillWorkbook };
  if (typeof module !== 'undefined') module.exports = root.TurnWorkbook;
})(typeof window !== 'undefined' ? window : globalThis);
