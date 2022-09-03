<template>
  <footer class="footer">
    <p class="footer__author footer__text">&copy; Дарья Иванова, 2022</p>
    <div class="contacts">
      <p class="contacts__title">Контакты</p>
      <ul class="contacts__list">
        <li class="contacts__item">Telegram: <a href="https://t.me/DariyIva" target="_blank" class="contacts__link">DariyIva</a></li>
        <li class="contacts__item">GitHub: <a href="https://github.com/dariy-iva" target="_blank" class="contacts__link">dariy-iva</a></li>
        <li class="contacts__item">Почта: <a href="mailto:dashann@mail.ru" class="contacts__link">dashann@mail.ru</a></li>
        <li class="contacts__item">Телефон: <span class="contacts__link">+7 (911) 027-14-37</span></li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style>
.footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--gray-color);
  padding: 20px 0;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 400;
}

.contacts__title {
  font-weight: 700;
  margin: 0;
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contacts__list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 5px;
}

.contacts__item {
  color: var(--gray-color);
}

.contacts__link {
  text-decoration: none;
  color: var(--black-color);
  transition: color .3s;
}

.contacts__link:not(:last-child):hover {
  color: var(--blue-color);
}
</style>