<nav class="navbar navbar-default navbar-fixed-top white-back">

<div class="container" style="width:auto">

    <div class="navbar-header" style="	border-bottom:1px solid #fff;">
        
        <a class="navbar-brand" href="#" data-murl="discover">
            <img id="logo" alt="" width="100" src="<?php echo $sm['config']['logo']; ?>">
        </a>

    </div>

    <div id="navbar" class="navbar-collapse collapse">

        <ul class="nav navbar-nav" style="margin-top: 80px;">

            <li class="dropdown open">



                <ul class="dropdown-menu">

                    <li>

                        <a href="#" onClick="goToProfile(<?= $sm['user']['id']; ?>)" class="padding-right relative line40">
                            <div class="right-menu-profile-photo" data-back-photo="1" data-src="<?= $sm['user']['profile_photo']; ?>" data-width="22"
                                style="top:6px"> </div>
                            <?= $sm['user']['name'];?>
                        </a>

                    </li>

                    <li>

                        <li>

                            <a href="#" data-murl="visits" data-b="0" class="padding-right relative line40">
                                <i class="material-icons dropdowni">remove_red_eye</i>
                                <?= $sm['twoo_lang'][18]['text']; ?>
                                    <span class="right-submenu-bubble" id="visit-count" data-main-background="1">
                                        <?= totalVisitsTwoo($sm['user']['id']); ?>
                                    </span>
                            </a>

                        </li>

                        <li>

                            <a href="#" data-murl="fans" data-b="0" class="padding-right relative line40">
                                <i class="material-icons dropdowni">sentiment_satisfied</i>
                                <?= $sm['twoo_lang'][19]['text']; ?>
                                    <span class="right-submenu-bubble" id="likes-count" data-main-background="1">
                                        <?= totalFansTwoo($sm['user']['id']); ?>
                                    </span>
                            </a>

                        </li>

                        <li>
                            <a href="#" data-murl="ilike" data-b="0" class="padding-right relative line40">
                                <i class="material-icons dropdowni">check</i>
                                <?= $sm['twoo_lang'][20]['text']; ?>
                            </a>
                        </li>

                        <li>
                            <a href="#" data-murl="matches" data-b="0" class="padding-right relative line40">
                                <i class="material-icons dropdowni">favorite_border</i>
                                <?= $sm['twoo_lang'][21]['text']; ?>
                                    <span class="right-submenu-bubble" id="matches-count" data-main-background="1">0</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" data-murl="settings" data-b="0" class="padding-right relative line40">
                                <i class="material-icons dropdowni">settings</i>
                                <?= $sm['twoo_lang'][23]['text']; ?>
                            </a>
                        </li>



                        <?php if($sm['user']['premium'] == 0) { ?>

                        <li>

                            <a href="#" data-open-premium-modal="1" class="padding-right relative line40 white-color" style="background:#7246ED">
                                <i class="material-icons dropdowni white-color">stars</i>

                                <?= $sm['twoo_lang'][25]['text']; ?>

                            </a>

                        </li>

                        <?php } ?>

                        <li>
                            <a href="<?= $sm['config']['site_url']; ?>logout" class="padding-right relative line40">
                                <i class="material-icons dropdowni">exit_to_app</i>
                                <?= $sm['twoo_lang'][24]['text']; ?>
                            </a>
                        </li>

                </ul>

                </li>

                <?php if($sm['user']['premium'] == 1) { ?>

                <li class="dropdown">

                    <span class="tooltip-toggle2" aria-label="Premium <?= $sm['lang'][218]['text']; ?> <?= adminCheckDaysLeft($sm['user']['premium_check']); ?>">
                        <img src="<?= $sm['config']['theme_url']; ?>/assets/img/premium.png" width="32px" style="padding-top:18px;" alt="Premium" />
                    </span>

                </li>

                <?php } ?>

                <li class="dropdown">

                    <a href="#" data-murl="credits" data-b="0" class="dropdown-toggle bn-menu-right">
                        <i class="material-icons dropdowni" style="font-size:32px;color:#FEC309;">copyright</i>

                        <?php if($sm['user']['credits'] != 0) { ?>

                        <span class="header-credits" id="creditsAmount">
                            <?= $sm['user']['credits']; ?>
                        </span>

                        <?php } ?>

                    </a>

                </li>


        </ul>

    </div>
    <!--/.nav-collapse -->

</div>

</nav>