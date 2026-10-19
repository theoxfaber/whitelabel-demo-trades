(function(){
  var toggle=document.querySelector('.nav-toggle'),nav=document.getElementById('site-nav');
  if(toggle&&nav){
    toggle.addEventListener('click',function(){
      var open=toggle.getAttribute('aria-expanded')==='true';
      toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);
    });
    nav.addEventListener('click',function(e){if(e.target.tagName==='A'){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');}});
  }
  var form=document.getElementById('quote-form');if(!form)return;
  var status=document.getElementById('form-status');
  var rules={
    name:function(v){return v.trim().length>=2||'Please enter your name.';},
    phone:function(v){return /^[+()\d\s-]{10,}$/.test(v.trim())||'Please enter a phone number we can call.';},
    postcode:function(v){return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(v.trim())||'Please enter a UK postcode, e.g. AB1 2CD.';},
    email:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())||'Please enter a valid email address.';},
    service:function(v){return v!==''||'Please choose a service.';}
  };
  function check(el){
    var rule=rules[el.name];if(!rule)return true;
    var res=rule(el.value),err=document.getElementById(el.id+'-err');
    if(res===true){el.removeAttribute('aria-invalid');err.textContent='';return true;}
    el.setAttribute('aria-invalid','true');err.textContent=res;return false;
  }
  Object.keys(rules).forEach(function(k){var el=form.elements[k];el.addEventListener('blur',function(){if(el.value)check(el);});});
  form.addEventListener('submit',function(e){
    e.preventDefault();status.className='form-status';status.textContent='';
    var first=null;
    Object.keys(rules).forEach(function(k){var el=form.elements[k];if(!check(el)&&!first)first=el;});
    if(first){first.focus();status.textContent='Please fix the highlighted fields.';return;}
    var name=form.elements.name.value.trim().split(' ')[0];
    form.reset();
    status.className='form-status ok';
    status.textContent='Thanks '+name+'! (Demo: nothing was sent. On a live site this would go to the business by email.)';
  });
})();
