$(document).ready(function() {
  $(".btn").click(function() {
    $("form").validate();
if ($("form").valid()) {
      var tl = new TimelineMax();
      $(".btn").addClass("spinner");
      $(".btn").css({ backgroundColor: "white", border: "3px solid #EC3A48" });
      tl.to(".btn", 0.15, {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        x: "+=150px",
        ease: Ease.linear
      });

      setTimeout(function() {
        var tl = new TimelineMax();
        tl.to(".spinner", 0, {
          scale: 0.5,
          ease: Ease.easeOut
        });
        $(".btn").removeClass("spinner");
        $(".btn").html(
          '<i class="fa fa-thumbs-up fa-2x" aria-hidden="true"></i>'
        );
        $(".btn").css({ backgroundColor: "#EC3A48", border: "none" });
        $(".btn").prop("disabled", true);
        tl.to(".btn", 0.25, { scale: 1, ease: Ease.easeIn });
      }, 4800);
    return false;
}
  });
});
