const generator = document.querySelector('.generator-button');
const lockBtn = document.querySelector('.lock-toggle');
const copyBtn = document.querySelector('.copy-button');

class Color{
   constructor (hex, element) {
      this.hex = hex;
      this.element = element;
      this.locked = false;
   }
   setHex(hex) {
      this.hex = hex;
      this.element.style.backgroundColor = hex;
      this.element.querySelector('.color-input').value = hex;
   }
   setLocked(locked) {
      this.locked = locked;

      if (locked) {
         lockBtn.classList.add('is-locked');
         this.element.querySelector('img')
            .src = "icons/lock-closed.svg";
      } else {
         lockBtn.classList.remove('is-locked');
         this.element.querySelector('img')
            .src = "icons/lock-open.svg";
      }
   }
   toggleBtn() {
      this.setLocked(!this.locked);
   }
   generateHex() {
      if (this.locked) {
         return;
      }
      const chars = "0123456789ABCDEF";
      let color = '#';
      for (let i = 0; i < 6; i++){
         color += chars[Math.floor(Math.random() * 16)];  
      }

      this.setHex(color);
   }
   copyClipboard() {
      colorInput.select();
      document.execCommand('copy');
      colorInput.blur();
      this.element.classList.add('copied');

      setTimeout(() => {
         this.element.classList.remove('copied');
      }, 1000);
   }
}

const color_elements = document.querySelectorAll('.colors .color');
const colors = [];

for (let i = 0; i < color_elements.length; i++){
   let color_el = color_elements[i];
   let input = color_el.querySelector('.color-input');
   let lockBtn = color_el.querySelector(".lock-toggle");
   let copyBtn = color_el.querySelector(".copy-button");

   let hex = input.value;

   let color = new Color(hex, color_el);
   input.addEventListener('input', (e) => {
      color.setHex(e.target.value);
   })
   lockBtn.addEventListener('click',()=> color.toggleBtn());
   copyBtn.addEventListener('click',()=> color.copyClipboard());

   color.generateHex();
   colors.push(color);
}
generator.addEventListener('click', () => {
   for (let i = 0; i < colors.length; i++){
      colors[i].generateHex();
   }
});

document.addEventListener('keypress', (e) => {
	if (e.code.toLowerCase() === "space") {
		generator.click();
	}
});
