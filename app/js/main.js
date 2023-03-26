"use scrict";

//переключение табов на главной странице
function handleTab(evt, tabName) {
  const tabcontent = document.querySelectorAll(".tab__content"),
    tablinks = document.querySelectorAll(".tab__links-item");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" tab__links-item--active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " tab__links-item--active";
}


//выбор новых фильтров
const tabContent = document.querySelector(".tab__content");

if(tabContent){
  const tabFilterButtons = document.querySelectorAll('.tab-filter__button');

  tabFilterButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      if (button.classList.contains('tab-filter__button--active')) {
        button.classList.remove('tab-filter__button--active');
      } else {
        button.classList.add('tab-filter__button--active');
      }
    })
  });

}


//изменение тегов
const articlePage = document.querySelector(".article-page");

if(articlePage){
  const articleTags = document.querySelectorAll('.article__tag');

  articleTags.forEach((tag) => {
    tag.addEventListener('click', function (e) {
      if (tag.classList.contains('article__tag--chosen')) {
        tag.classList.remove('article__tag--chosen');
      } else {
        tag.classList.add('article__tag--chosen');
      }
    })
  });

  const articleInfoItemActions = document.querySelectorAll('.article__data-info-item--action');
  articleInfoItemActions.forEach((action) => {
    action.addEventListener('click', function (e) {
      if (action.classList.contains('article__data-info-item--chosen')) {
        action.classList.remove('article__data-info-item--chosen');
      } else {
        action.classList.add('article__data-info-item--chosen');
      }
    })
  });
}




