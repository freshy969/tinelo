<div class="topbox">
				<div class="topmenu">

					<div class="lang" style="float: right;margin-top:10px!important;">
						<a style="color:#ccc;margin-left:0!important" href="index.php?page=index&lang=1">PL</a>
						<a style="color:#ccc;margin-left:10px!important" href="index.php?page=index&lang=36">EN</a>
					</div>

					<div class="" style="">

						<ul class="nav navbar-nav navbar-right">

							<li>
								<a href="#" data-murl="meet" class="bn-menu-color" data-hover-color="1">
									<img src="<?php echo $sm['config']['theme_url']; ?>/assets/img/discover-icon.png" height="32"> </a>
								<!-- off
									<i class="material-icons" style="position:absolute;right:18px;top:31px;font-size:34px;color:#dcdcdc;line-height:0;">language</i>
									-->
								</a>

							</li>

							<li>
								<a href="#" data-murl="discover" class="bn-menu-color" data-hover-color="1">
									<img src="<?php echo $sm['config']['theme_url']; ?>/assets/img/discover-icon.png" height="32"> </a>

							</li>

							<li>
								<a href="#" data-murl="chat" class="bn-menu-color" data-hover-color="1">
									<img src="<?php echo $sm['config']['theme_url']; ?>/assets/img/chat-icon.png" height="32"> </a>

								<span class="right-menu-bubble2" data-main-background="1" id="chat-count"></span>

							</li>

						</ul>
					</div>

				</div>

			</div>

			<div class="spotlight">

				<div class="container relative">

					<div class="spotlight-left">

						<i class="material-icons" style="font-size:46px;color:#666;">chevron_left</i>

					</div>

					<div class="spotlight-right">

						<i class="material-icons" style="font-size:46px;color:#666;">chevron_right</i>

					</div>

					<div class="spotlight-photos">

						<div class="spotlight-add-me" data-back-photo="1" data-src="<?= $sm['user']['profile_photo']; ?>" data-width="70">

							<div class="overlay">

								<i class="material-icons white-color">add</i>

							</div>

						</div>

						<div class="spotlight-profile-photo" style="display:none" data-spotlight-me="1" data-back-photo="1" data-src="<?= $sm['user']['profile_photo']; ?>"
						    data-width="70"></div>

						<?= spotLightTwoo($sm['user']['lat'],$sm['user']['lng']); ?>

					</div>

				</div>

			</div>