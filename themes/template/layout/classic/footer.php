<div class="footer" data-border-footer="1">

    <div class="container relative">

        <center style="margin-bottom: 10px;margin-top: 10px;">
            <?php if(siteConfig('ads') != ''){ echo siteConfig('ads'); } ?>
        </center>

        <div class="apps" style="border-bottom: none">

            <?php if($sm['config']['ios'] != ''){ ?>

            <a href="<?= $sm['config']['ios']; ?>" target="_blank">
                <img class="store" src="<?php echo $sm['config']['theme_url']; ?>/assets/img/appstore.png">
            </a>

            <?php } if($sm['config']['android'] != '') { ?>

            <a href="<?= $sm['config']['android']; ?>" target="_blank">
                <img class="store" src="<?php echo $sm['config']['theme_url']; ?>/assets/img/playstore.png">
            </a>

            <?php } if($sm['config']['facebook'] != '') { ?>

            <a href="<?= $sm['config']['facebook']; ?>" target="_blank">
                <img class="social" src="<?php echo $sm['config']['theme_url']; ?>/assets/img/fb.jpg">
            </a>

            <?php } if($sm['config']['google'] != '') { ?>

            <a href="<?= $sm['config']['google']; ?>" target="_blank">
                <img class="social" src="<?php echo $sm['config']['theme_url']; ?>/assets/img/google.jpg">
            </a>

            <?php } if($sm['config']['twitter'] != '') { ?>

            <a href="<?= $sm['config']['twitter']; ?>" target="_blank">
                <img class="social" src="<?php echo $sm['config']['theme_url']; ?>/assets/img/twitter.jpg">
            </a>

            <?php } ?>

        </div>



        <div class="text">

            <a href="<?= $sm['config']['site_url']; ?>terms" class="top-text">
                <?= $sm['lang'][103]['text']; ?>
            </a>

            <a href="<?= $sm['config']['site_url']; ?>privacy" class="top-text">
                <?= $sm['lang'][102]['text']; ?>
            </a>

            <div class="margin-top-5"></div>

            <?php if($sm['config']['facebook'] != '') { ?>

            <a class="down-text" href="<?= $sm['config']['facebook']; ?>" target="_blank">Facebook</a>

            <?php } if($sm['config']['google'] != '') { ?>

            <a class="down-text" href="<?= $sm['config']['google']; ?>" target="_blank">Google</a>

            <?php } if($sm['config']['twitter'] != '') { ?>

            <a class="down-text" href="<?= $sm['config']['twitter']; ?>" target="_blank">Twitter</a>

            <?php } ?>

            <a href="#" class="down-text">
                <?= $sm['config']['name']; ?> 2016</a>

        </div>

    </div>

</div>