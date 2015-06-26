(function () {

	$('.popup').magnificPopup({
		type: 'ajax',
    tClose: 'Закрыть (Esc)',
    tLoading: 'Загрузка...',
    ajax: {
      tError: 'Ошибка: <a href="%url%">карточка</a> не загружается.'
    }
	});

	var scheme_height = 874;
	var scheme_width = 1317;

	var $bg_blur = $('.bg--blurred');
	var bg_state = null;

	var $scheme = $('#scheme');

	var items = [
		{
			lines_id: 'scheme_words',
			top_shield_id: 'about_good_piter',
			to_next_block: 100000
		},
		{
			lines_id: 'scheme_all',
			top_shield_id: 'bad_piter',
			to_next_block: 2350
		},
		{
			lines_id: 'scheme_family',
			top_shield_id: 'family',
			to_next_block: 1300
		},
		{
			lines_id: 'scheme_army',
			top_shield_id: 'army',
			to_next_block: 1300
		},
		{
			lines_id: 'scheme_study',
			top_shield_id: 'study',
			to_next_block: 1300
		},
		{
			lines_id: 'scheme_twoplaces',
			top_shield_id: 'twoplaces',
			to_next_block: 1300
		},
		{
			lines_id: 'scheme_commercial',
			top_shield_id: 'commercial',
			to_next_block: 1300
		},
		{
			lines_id: 'scheme_election',
			top_shield_id: 'election',
			to_next_block: 1300
		},
		{
			lines_id: 'scheme_goszakaz',
			top_shield_id: 'goszakaz',
			to_next_block: 1300
		},
		{
			lines_id: 'scheme_full',
			top_shield_id: 'share-n-like',
			to_next_block: 5000
		}
	];

	/**
	 * Подстраивает маскирование блока в зависимости
	 * от позиции скрола
	 * @param {Object} item
	 * @param {Number} scroll
	 */
	function changePos(item, scroll) {
		var $lines = item.$lines;
		var $inner = item.$inner;
		var from_top = item.from_top;
		var to_next_block = item.to_next_block;
		var top_distance = scroll - from_top;

		if (top_distance > 0) {
			if (top_distance < scheme_height + to_next_block) {
				$scheme.addClass(item.schemeClass);
				$lines.css('height', top_distance < to_next_block ? top_distance : to_next_block + 'px');
				$lines.css('top', scheme_height - top_distance + 'px');
				$inner.css('top', -(scheme_height - top_distance) + 'px');
			} else {
				hide(item)
			}
		} else {
			hide(item)
		}
	}

	function hide(item) {
		$scheme.removeClass(item.schemeClass);
		item.$lines.css({ height: 0, top: scheme_height });
	}

	/**
	 * Вычисление координат блоков
	 * @param {Number} index - Индекс блока
	 * @param {Object} item - Объект блока
	 */
	function calcMetrics(index, item) {
		var $lines = $('#' + item.lines_id);
		var $inner = $lines.find('> .inner');
		var $shield = $('#' + item.top_shield_id);
		var $shield_div = $shield.find(' > div');
		var from_top = $shield.position().top + $shield_div.position().top + $shield_div.height() - scheme_height;

		item.$lines = $lines;
		item.$inner = $inner;
		item.from_top = from_top;
		item.to_next_block = item.to_next_block || 1000;
		item.schemeClass = item.lines_id.replace(/_/, '--');
	}

	/**
	 * Движение схемы вправо-влево
	 * @param {Object} e - Mouse event object
	 */
	function onMouseMove(e) {
		var width = $(window).width();
		if (width >= scheme_width) {
			$scheme.css('left', 0);
		} else {
			var coef = (scheme_width - width) / width;
			$scheme.css('left', (-e.pageX * coef + (scheme_width - width) / 2));
		}
	}

	/**
	 * Размытие фона
	 * @param {Number} scroll - Scroll top position
	 */
	function backgroundBlur(scroll) {
		if (scroll > 500) {
			if (bg_state != 'to_blur') {
				bg_state = 'to_blur';
				$bg_blur.stop().animate({
					opacity: 1
				}, 300);
			}
		} else {
			if (bg_state != 'to_clear') {
				bg_state = 'to_clear';
				$bg_blur.stop().animate({
					opacity: 0
				}, 300);
			}
		}
	}

	/**
	 * Маскирование схемы
	 * @param {Number} scroll - Scroll top position
	 */
	function schemeMasking(scroll) {
		changePos(items[0], scroll);
		changePos(items[1], scroll);
		changePos(items[2], scroll);
		changePos(items[3], scroll);
		changePos(items[4], scroll);
		changePos(items[5], scroll);
		changePos(items[6], scroll);
		changePos(items[7], scroll);
		changePos(items[8], scroll);
		changePos(items[9], scroll);
	}

	function onScroll() {
		var scroll = $(window).scrollTop();
		backgroundBlur(scroll);
		schemeMasking(scroll);
	}

	$(items).each(calcMetrics);

	$(window)
		.on('mousemove', onMouseMove)
		.on('scroll', onScroll);


  function initShareBlock(block) {
    var quickServices = ['vkontakte', 'facebook', 'twitter', 'odnoklassniki'];
    new Ya.share({
      l10n: 'ru',
      element: block,
      theme: 'counter',
      elementStyle: {
        'type': 'icon',
        'border': false,
        'quickServices': quickServices
      },
      link: link,
      title: title,
      description: description,
      image: image,
      serviceSpecific: {
        twitter: {
          title: twitter_title
        }
      },
      onshare: function (social_network) {
        dataLayer.push({
          'social_network': social_network,
          'event': 'share'
        });
      }
    });
  }
  $(function(){
    $('#ya_shr').each(function(i, el) {
      initShareBlock(el);
    })
  });


}());