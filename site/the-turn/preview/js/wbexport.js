/* The Turn: fill a workbook PDF with a learner's answers. Runs in the browser (window.PDFLib) and in node for tests. */
(function (root) {
  var MAP = { watch_fork: 'fork', recall_words: 'words', reflect_kq: 'kq', reflect_door: 'door', relate_rep: 'rep', refine_changed: 'changed', release_stack: 'stack', release_felt: 'felt' };
  var KEEP = /[^\x09\x0A\x20-\x7E -ÿ‘’“”–—…•]/g;
  var dropped = 0, clipped = [];
  function clean(s) {
    s = String(s || '').replace(/\r/g, '');
    var m = s.match(KEEP); if (m) dropped += m.length;
    return s.replace(KEEP, '').replace(/[ \t]{2,}/g, ' ').replace(/ +\n/g, '\n').trim();
  }
  function lines(font, txt, size, width) {
    var n = 0;
    txt.split('\n').forEach(function (para) {
      var words = para.split(' '), line = '';
      if (!para) { n++; return; }
      words.forEach(function (w) {
        var t = line ? line + ' ' + w : w;
        if (font.widthOfTextAtSize(t, size) <= width) { line = t; return; }
        if (line) n++;
        line = w;
        while (font.widthOfTextAtSize(line, size) > width && line.length > 1) {   // a word longer than the box wraps by character
          var k = line.length; while (k > 1 && font.widthOfTextAtSize(line.slice(0, k), size) > width) k--;
          n++; line = line.slice(k);
        }
      });
      n++;
    });
    return n;
  }
  function fit(font, field, txt, name) {
    var r = field.acroField.getWidgets()[0].getRectangle();
    for (var s = 11; s >= 6; s -= 0.5) { if (lines(font, txt, s, r.width - 14) * s * 1.25 <= r.height - 8) return s; }
    clipped.push(name); return 6;
  }
  function whiteBg(field) { try { field.acroField.getWidgets().forEach(function (w) { w.getOrCreateAppearanceCharacteristics().setBackgroundColor([1, 1, 1]); }); } catch (e) {} }
  async function fillWorkbook(PDFLib, bytes, ans) {
    dropped = 0; clipped = [];
    var doc = await PDFLib.PDFDocument.load(bytes, { updateMetadata: false });
    var form = doc.getForm(), font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
    Object.keys(MAP).forEach(function (name) {
      var v = clean(ans[MAP[name]]); if (!v) return;
      var f = form.getTextField(name); whiteBg(f); f.setFontSize(fit(font, f, v, name)); f.setText(v);
    });
    [1, 2].forEach(function (d) {
      var w = clean(ans['six' + d]).split(/\s+/).filter(function (x) { return /[A-Za-z0-9À-ÿ]/.test(x); });
      if (!w.length) return;
      var parts = w.slice(0, 5); if (w.length > 5) parts.push(w.slice(5).join(' '));
      parts.forEach(function (x, i) {
        var f = form.getTextField('refine_d' + d + '_' + (i + 1)), r = f.acroField.getWidgets()[0].getRectangle(), s = 12;
        while (s > 5 && font.widthOfTextAtSize(x, s) > r.width - 6) s -= 0.5;
        if (font.widthOfTextAtSize(x, s) > r.width - 6) { while (x.length > 1 && font.widthOfTextAtSize(x + '…', s) > r.width - 6) x = x.slice(0, -1); x += '…'; clipped.push('refine_d' + d + '_' + (i + 1)); }
        whiteBg(f); f.setFontSize(s); f.setText(x);
      });
    });
    if (ans.pillar) { try { form.getCheckBox('pillar_' + ans.pillar).check(); } catch (e) {} }
    form.updateFieldAppearances(font);
    form.acroForm.dict.set(PDFLib.PDFName.of('NeedAppearances'), PDFLib.PDFBool.False);
    root.TurnWorkbook.lastDropped = dropped; root.TurnWorkbook.lastClipped = clipped.slice();
    return doc.save();
  }
  root.TurnWorkbook = { fillWorkbook: fillWorkbook, lastDropped: 0, lastClipped: [] };
  if (typeof module !== 'undefined') module.exports = root.TurnWorkbook;
})(typeof window !== 'undefined' ? window : globalThis);
