// Fernhill Roofing demo: mobile menu, postcode area check, quote form validation.
// Front end only. Nothing is sent or stored.
(function () {
  "use strict";

  // Mobile menu
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.textContent = open ? "Menu" : "Close";
      nav.classList.toggle("open", !open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "Menu";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "Menu";
        btn.focus();
      }
    });
  }

  var form = document.getElementById("quote-form");
  if (!form) return;

  var postcodeRe = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}$/i;
  var phoneRe = /^(?:\+44\s?|0)(?:\d\s?){9,10}$/;
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Districts we cover; matches the list in the Areas section.
  var covered = ["HX1", "HX2", "HX3", "HX4", "HX5", "HX6", "HX7", "OL13", "OL14", "OL15", "BD20", "BD21", "BD22"];

  function outward(pc) {
    var clean = pc.replace(/\s+/g, "").toUpperCase();
    return clean.length > 3 ? clean.slice(0, clean.length - 3) : "";
  }

  var pcInput = document.getElementById("f-postcode");
  var pcHint = document.getElementById("h-postcode");
  pcInput.addEventListener("blur", function () {
    var v = pcInput.value.trim();
    if (!postcodeRe.test(v)) { pcHint.textContent = ""; return; }
    pcInput.value = v.replace(/\s+/g, "").toUpperCase().replace(/^(.+)(\d[A-Z]{2})$/, "$1 $2");
    pcHint.textContent = covered.indexOf(outward(v)) !== -1
      ? "That's in our patch."
      : "That's outside our usual area. Send it anyway and we'll say if we can help.";
  });

  function setError(input, id, msg) {
    var el = document.getElementById(id);
    el.textContent = msg || "";
    if (input) {
      if (msg) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }
    return !msg;
  }

  function check() {
    var ok = true;
    var first = null;
    function mark(input, id, msg) {
      var good = setError(input, id, msg);
      if (!good) { ok = false; if (!first) first = input; }
    }

    var name = form.elements.name;
    mark(name, "e-name", name.value.trim().length < 2 ? "Enter your name so we know who to ask for." : "");

    var phone = form.elements.phone;
    var p = phone.value.trim();
    mark(phone, "e-phone", !p ? "Enter a phone number. We ring back rather than email." :
      !phoneRe.test(p) ? "That doesn't look like a UK number. Try 01632 960418 or 07700 900123 format." : "");

    var pc = form.elements.postcode;
    var pcv = pc.value.trim();
    mark(pc, "e-postcode", !pcv ? "Enter the postcode of the house with the roof problem." :
      !postcodeRe.test(pcv) ? "Check the postcode, for example HX7 8AD." : "");

    var email = form.elements.email;
    var ev = email.value.trim();
    mark(email, "e-email", ev && !emailRe.test(ev) ? "Check the email address, or leave it blank." : "");

    var job = form.elements.job;
    mark(job, "e-job", !job.value ? "Choose what needs doing. 'Something else' is fine." : "");

    var when = form.querySelector('input[name="when"]:checked');
    var whenFirst = form.querySelector('input[name="when"]');
    mark(when ? null : whenFirst, "e-when", when ? "" : "Choose how soon you need us.");

    var photos = form.elements.photos;
    var tooMany = photos.files && photos.files.length > 4;
    var tooBig = false;
    if (photos.files) {
      for (var i = 0; i < photos.files.length; i++) {
        if (photos.files[i].size > 10 * 1024 * 1024) tooBig = true;
      }
    }
    mark(photos, "e-photos", tooMany ? "Pick up to 4 photos." : tooBig ? "One photo is over 10 MB. Try a smaller one." : "");

    return { ok: ok, first: first };
  }

  // Clear an error as soon as the field is fixed
  form.addEventListener("input", function (e) {
    var t = e.target;
    if (t.getAttribute("aria-invalid") === "true") check();
  });
  form.addEventListener("change", function (e) {
    if (e.target.name === "when") setError(null, "e-when", "");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var res = check();
    var done = document.getElementById("form-done");
    if (!res.ok) {
      done.hidden = true;
      if (res.first) res.first.focus();
      return;
    }
    var first = form.elements.name.value.trim().split(/\s+/)[0];
    var urgent = form.querySelector('input[name="when"]:checked').value === "Water coming in now";
    done.innerHTML = "";
    var p1 = document.createElement("p");
    p1.innerHTML = "<strong>Thanks, " + first.replace(/[<>&"]/g, "") + ". Enquiry ready to send.</strong>";
    var p2 = document.createElement("p");
    p2.textContent = urgent
      ? "With water coming in, the live site would also show the storm line number here: 01632 960418."
      : "On the live site this goes to the office and we ring back the same working day.";
    var p3 = document.createElement("p");
    p3.className = "small";
    p3.textContent = "This is a demo build, so nothing has been sent or stored.";
    done.appendChild(p1); done.appendChild(p2); done.appendChild(p3);
    done.hidden = false;
    done.focus();
  });
})();
