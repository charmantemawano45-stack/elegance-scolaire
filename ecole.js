var S = 'elegance_scolaire_students',       A = 'admin2026',       P = 'charmante06022008',       D = document,       L = localStorage,       G = function(i) { return D.getElementById(i); },       LS = G('loginSection'),       AS = G('adminSection'),       PS = G('parentSection'),       LI = G('loginId'),       LP = G('loginPassword'),       LE = G('loginError'),       SC = G('studentListContainer'),       PC = G('parentContent'); 
 
  function DB(x) {     if (x) {       L.setItem(S, JSON.stringify(x));       return;     }     return JSON.parse(L.getItem(S) || '[]');   } 
 
  function SH(x) {     LS.className = 'hidden';     AS.className = 'hidden';     PS.className = 'hidden';     x.className = '';   }                                                                                                                                                                         
 
  function ID() {     return 'STU-' + Math.floor(Math.random() * 99999);   } 
 
  function PW() {     return Math.floor(Math.random() * 999999);   } 
 
  function getMention(note) {     if (note >= 90) return '🏆 Exceptionnel';     if (note >= 80) return '🌟 Très bien';     if (note >= 70) return '👍 Bien';     if (note >= 60) return '📚 Assez bien';     if (note >= 50) return '⚠ Passable';     return '❌ Insuffisant';   } 
 
  G('loginBtn').onclick = function() { 
    var i = LI.value,         p = LP.value,         s = DB(); 
 
    if (i == A && p == P) {       SH(AS);       R();       return;     } 
 
    for (var a = 0; a < s.length; a++) {       if (s[a].id == i && s[a].password == p) {         var note = s[a].noteGenerale;         var mention = (note !== null && note !== undefined) ? getMention(note) : 'Non évalué';         var noteHtml = '';                  if (note !== null && note !== undefined) {           noteHtml = '<div class="note-generale">' + note + '%</div>' +                      '<div class="mention">' + mention + '</div>';         } else {           noteHtml = '<div style="text-align:center; padding:20px; background:#ece9d8; border:1px solid #7f9db9; margin:15px 0;">' +                      '📌 Aucune note disponible pour le moment.</div>';         }                  var h = '<h2 style="color:#003399; text-align:center;">' + s[a].name + '</h2>' +                 '<p style="text-align:center;"><strong>Classe :</strong> ' + s[a].className + '</p>' +                 '<hr style="margin:10px 0; border-color:#7f9db9;">' +                 '<h3 style="text-align:center;">📊 Note générale</h3>' +                 noteHtml;                  PC.innerHTML = h;         SH(PS);         return;       }     }     LE.innerHTML = 'Identifiants invalides';   };      function R() {     var s = DB(),         h = '<table border="1" width="100%">' +             '<thead><tr><th>ID</th><th>Nom</th><th>Classe</th><th>Mot de passe</th><th>Note générale</th><th>Action</th></tr></thead><tbody>';     for (var i = 0; i < s.length; i++) {       var noteAffichee = (s[i].noteGenerale !== null && s[i].noteGenerale !== undefined) ? s[i].noteGenerale + '%' : 'Non noté'; 
      h += '<tr>' +      '<td>' + s[i].id + '</td>' +      '<td>' + s[i].name + '</td>' +      '<td>' + s[i].className + '</td>' +      '<td>' + s[i].password + '</td>' +      '<td><strong>' + noteAffichee + '</strong></td>' +      '<td>' +      '<button class="btn-lux" onclick="N(' + i + ')">✏ Saisir note</button> ' +      '<button class="btn-lux btn-outline" onclick="supprimerEleve(' + i + ')">🗑 Retirer</button>' +      '</td>' +      '</tr>';     }     h += '</tbody></table>';     if (s.length === 0) h = '<p>Aucun élève enregistré.</p>';     SC.innerHTML = h;   } 
 
  window.N = function(i) {     var s = DB(),         n = prompt('Note générale (pourcentage de 0 à 100)', s[i].noteGenerale || '');     if (n === null) return;     n = parseInt(n);     if (isNaN(n)) {       alert('Veuillez entrer un nombre valide.');       return;     }     if (n < 0) n = 0;     if (n > 100) n = 100;     s[i].noteGenerale = n;     DB(s);     R();   }; 
 
  window.supprimerEleve = function(index) {     var s = DB();     if (confirm('Voulez-vous vraiment retirer l\'élève ' + s[index].name + '?')) {       s.splice(index, 1);       DB(s);       R();     }   }; 
 
  G('generateStudentBtn').onclick = function() {     var s = DB(),         nameInput = G('studentName'),         classInput = G('studentClass');     if (!nameInput.value.trim()) { 
      alert('Veuillez saisir le nom de l\'élève.');       return;     }     var o = {       id: ID(),       password: PW(),       name: nameInput.value,       className: classInput.value || 'Non défini',       noteGenerale: null     };     s.push(o);     DB(s);     G('newId').innerHTML = o.id;     G('newPass').innerHTML = o.password;     G('generatedCredentials').style.display = 'block';     nameInput.value = '';     classInput.value = '';     R();   }; 
 
  G('adminLogout').onclick = function() { location.reload(); };   G('parentLogout').onclick = function() { location.reload(); }; 