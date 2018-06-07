<div class="modal fade" id="spotlightModal" tabindex="-1" role="dialog" aria-labelledby="spotlightModalLabel">

  <div class="modal-dialog" role="document">

	<div class="modal-content">

	  <div class="modal-body">

		<button type="button" class="close close-spotlight" data-dismiss="modal" aria-label="Close">

			<span aria-hidden="true">&times;</span>

		</button>

		<h2 class="spotlight-modal-header"><?= $sm['twoo_lang'][29]['text']; ?></h2>

		<h3 class="spotlight-modal-subheader"><?= $sm['twoo_lang'][30]['text']; ?></h3>

		<div class="spotlight-photos-modal" id="userSpotlightModal">             

			<?= getUserPhotosSpotlightTwoo($sm['user']['id']); ?>

		</div>

		<div class="spotlight-modal-btn" id="add-sphoto" data-main-background="1">

			<center><span><?= $sm['twoo_lang'][31]['text']; ?></span></center>

		</div>

		<form id="add-photo-spotlight" style="display:none">

			<input type="hidden" name="s_photo" id="s_photo" />

			<input type="hidden" name="s_uid" value="<?= $sm['user']['id']; ?>" />

			<input type="hidden" name="s_lat" value="<?= $sm['user']['lat']; ?>" />

			<input type="hidden" name="s_lng" value="<?= $sm['user']['lng']; ?>" />

			<input type="hidden" name="s_lang" value="<?= $sm['user']['lang']; ?>" />

			<input type="hidden" name="action" value="spotlight" />					

		</form>		

		<h5 class="spotlight-modal-footer"> <?= $sm['twoo_lang'][13]['text']; ?> <?= $sm['price']['spotlight']; ?> <?= $sm['twoo_lang'][17]['text']; ?> </h5>               

	  </div>

	</div>

  </div>

</div>  

<div class="modal fade" id="creditsModal" tabindex="-1" role="dialog" aria-labelledby="creditsModalLabel">

  <div class="modal-dialog" role="document">

	<div class="modal-content paymentModal-content">

	  <div class="modal-header paymentModal-header">

		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

		<h4 class="modal-title"><?= $sm['twoo_lang'][32]['text']; ?><br>

		<span style="font-size:14px;"><?= $sm['twoo_lang'][33]['text']; ?></span></h4>

	  </div>

	  <div class="modal-credits-right">

		<h4><?= $sm['twoo_lang'][34]['text']; ?></h4>          

		<div class="credit-feature">

			<i class="material-icons">stars</i> <span><?= $sm['twoo_lang'][35]['text']; ?> <b><?= $sm['twoo_lang'][36]['text']; ?></b></span>

		</div>

		<div class="credit-feature">

			<i class="material-icons">card_giftcard</i> <span><?= $sm['twoo_lang'][37]['text']; ?><b><?= $sm['twoo_lang'][38]['text']; ?></b></span>

		</div>

		<div class="credit-feature">

			<i class="material-icons">mail_outline</i> <span><?= $sm['twoo_lang'][39]['text']; ?></span>

		</div>

		<div class="credit-feature">

			 <i class="material-icons">lock_open</i> <span><b><?= $sm['twoo_lang'][40]['text']; ?></b> <?= $sm['twoo_lang'][41]['text']; ?></span>

		</div>                                

	  </div>

	  <div class="modal-body">

		<div class="paymentModal-body-top">

			<?php if(siteConfig('paypal') != ''){ ?>		

			<div data-select-payment-method="1" data-payment-type="1" class="method" >

				<a href="#" data-payment="1">

					<img src="<?php echo $sm['config']['theme_url']; ?>/assets/img/paypal-logo.png" width="100" />

				</a>                    

			</div> 

			<?php } if(siteConfig('paygol') != ''){?>			

			<div data-select-payment-method="1" data-payment-type="1" class="method" >

				<a href="#" data-payment="2">

					<img src="<?php echo $sm['config']['theme_url']; ?>/assets/img/paygol-logo.png" width="100" />

				</a>                    

			</div>

			<?php } if(siteConfig('stripe_secret') != ''){ ?>			

			<div data-select-payment-method="1" data-payment-type="1" class="method" >

				<a href="#" data-payment="3">

					<img src="<?php echo $sm['config']['theme_url']; ?>/assets/img/creditcard-logo.png" width="100" />

				</a>                    

			</div>

			<?php } if(siteConfig('fortumo_secret') != ''){?>			

			<div data-select-payment-method="1" data-payment-type="1" class="method" >

				<a href="#" data-payment="4">

					<img src="<?php echo $sm['config']['theme_url']; ?>/assets/img/fortumo-logo.png" width="100" />

				</a>                    

			</div>

			<?php } ?>

		</div>

		  

		<div class="paymentModal-body-bottom">

			<label class="paymentModal-label"><?= $sm['twoo_lang'][42]['text']; ?></label>

			<select class="form-control input-lg" id="selectCredits">

			  <?= getCreditsPackagesTwoo(); ?>			

			</select>

			<div class="btn" id="buyCreditsBtn2">

				<center><span id="buyCreditsBtn"><?= $sm['twoo_lang'][43]['text']; ?></span></center>

			</div>                

		</div>

		  

	  </div>

	</div>

  </div>

</div>

<div class="modal fade" id="premiumModal" tabindex="-1" role="dialog" aria-labelledby="premiumModalLabel">

  <div class="modal-dialog" role="document">

	<div class="modal-content paymentModal-content">

	  <div class="modal-header paymentModal-header">

		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

		<h4 class="modal-title"><?= $sm['twoo_lang'][44]['text']; ?><br>

		<span style="font-size:14px;"><?= $sm['twoo_lang'][45]['text']; ?></span></h4>

	  </div>

	  <div class="modal-credits-right" style="background:#D1EDFF">

		<h4><?= $sm['twoo_lang'][46]['text']; ?></h4>

		<div class="credit-feature">

			<i class="material-icons" style="color:#007BE6">mail_outline</i> <span><?= $sm['premium']['chat']; ?> <?= $sm['twoo_lang'][47]['text']; ?></span>

		</div>

		<div class="credit-feature">

			 <i class="material-icons" style="color:#007BE6">lock_open</i> <span><b><?= $sm['twoo_lang'][48]['text']; ?></b> <?= $sm['twoo_lang'][49]['text']; ?></span>

		</div>                               

		<div class="credit-feature">

			<i class="material-icons" style="color:#007BE6">videocam</i> <span><?= $sm['twoo_lang'][50]['text']; ?> <b><?= $sm['twoo_lang'][51]['text']; ?></b></span>

		</div>

		<div class="credit-feature">

			<i class="material-icons" style="color:#007BE6">attach_money</i> <span><?= $sm['twoo_lang'][52]['text']; ?> <b><?= $sm['twoo_lang'][53]['text']; ?></b></span>

		</div>                               

	  </div>

	  <div class="modal-body">

		<div class="paymentModal-body-top">

			<div data-select-payment-method="1" data-payment-type="2" class="method" >

				<a href="#" data-payment="paypal">

					<img src="<?php echo $sm['config']['theme_url']; ?>/assets/img/paypal-logo.png" width="100" />

				</a>                    

			</div>                

		</div>

		

		<div class="paymentModal-body-bottom">

			<label class="paymentModal-label"><?= $sm['twoo_lang'][42]['text']; ?></label>

			<select class="form-control input-lg" id="selectPremium">

			<?= getPremiumPackagesTwoo(); ?>	

			</select>

			<div class="btn" data-premium-send>

				<center><span id="buyPremiumBtn" data-premium-send><?= $sm['twoo_lang'][54]['text']; ?></span></center>

			</div>                

		</div>         

		  

	  </div>

	</div>

  </div>

</div>

<div id="paymentForms" style="display:none">

	<form id="method01" action="https://www.paypal.com/cgi-bin/webscr" method="post">

	<input type="hidden" name="cmd" value="_xclick">

	<input type="hidden" name="business" value="<?= $sm['config']['paypal']; ?>">

	<input type="hidden" name="item_name" id="payment-name" value="<?= $sm['config']['name']; ?> Credits">

	<input type="hidden" name="currency_code" value="<?= $sm['config']['currency']; ?>">

	<input type="hidden" name="amount" id="payment-amount" value="">

	<input type="hidden" name="custom" id="payment-custom" value="">					

	<input type="hidden" name="notify_url" value="<?= $sm['config']['site_url']; ?>/assets/sources/ipn.php">

	<input type="hidden" name="return" value="<?= $sm['config']['site_url']; ?>/index.php?page=credits-ok">					

	</form>

	<form id="method02" name="pg_frm" method="post" action="https://www.paygol.com/pay" >

	<input type="hidden" name="pg_serviceid" value="<?= $sm['config']['paygol']; ?>">

	<input type="hidden" name="pg_currency" value="<?= $sm['config']['currency']; ?>">

	<input type="hidden" name="pg_name" id="payment-name2" value="<?= $sm['config']['name']; ?> Credits">

	<input type="hidden" name="pg_custom" id="payment-custom2" value="<?= $sm['user']['id']; ?>">

	<input type="hidden" name="pg_price" id="payment-amount2" value="">

	<input type="hidden" name="pg_return_url" value="<?= $sm['config']['site_url']; ?>/index.php?page=credits-ok">

	<input type="hidden" name="pg_cancel_url" value="<?= $sm['config']['site_url']; ?>">     

	</form>

	<form id="buy-premium" action="https://www.paypal.com/cgi-bin/webscr" method="post">

	<input type="hidden" name="cmd" value="_xclick">

	<input type="hidden" name="business" value="<?= $sm['config']['paypal']; ?>">

	<input type="hidden" name="item_name" id="payment-name3" value="<?= $sm['config']['name']; ?> Premium">

	<input type="hidden" name="currency_code" value="<?= $sm['config']['currency']; ?>">

	<input type="hidden" name="amount" id="payment-amount3" value="">

	<input type="hidden" name="custom" id="payment-custom3" value="">					

	<input type="hidden" name="notify_url" value="<?= $sm['config']['site_url']; ?>/assets/sources/ipnpremium.php">

	<input type="hidden" name="return" value="<?= $sm['config']['site_url']; ?>">						

	</form>	

</div>

<div class="videocall-chat"><video id="video-chat" autoplay></video></div>

<div class="videocall-container" style="display:none" >

	<div class="bulbs">

		<div id="end-call" class="bulb-1 "><i class="material-icons">local_phone</i></div>

		<div id="chat-call" class="bulb-2"><i class="material-icons">chat</i></div>  

		<div id="turn-mic" class="bulb-3"><i class="material-icons">mic</i></div>			

		<div id="turn-video" class="bulb-4"><i class="material-icons">videocam</i></div>    



	</div>

	<div class="videocall-container calle"  >

		<div class="loading">

			<b id="call_status" style="color:#FFF;"></b><br><br><br><br>

			<div class="call-loader" ></div>

		</div>

		<div class="profile-photo1">

			<img src="<?= $sm['user']['profile_photo']; ?>" />

			<video id="my-video" muted="true" autoplay></video>

		</div>

		<div class="video">

			<div class="topleft">

				<span><b id="call-name"></b><br></span><span id="minutes">00</span>:<span id="seconds">00</span>

			</div>					

			<video id="their-video" autoplay></video>

		</div>

		<img class="profile-photo2" alt="jofpin"/>

	</div>

</div>

<div class="videocall-notify" style="display:none" >

	<div class="ball">

		<div class="halo"></div>

		<div class="msg-count"><i class="fa fa-video-camera"></i></div>

		<div class="notif">

			<div class="bar">

				<div class="action"></div>

				<p class="text" id="text_videocall"></p>

			</div>

			<div class="arrow"></div>

		</div>

		<div class="buttons">  

			<a class="btn btn-accept" id="acept-video"><span class="icon icon-arrow"></span></a>

			<a class="btn btn-decline" id="reject-video"><span class="icon icon-x"></span></a>

		</div>

	</div>

</div>	