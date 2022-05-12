<template>
    <div class="container" id="div-loader">
        <div class="w-100 height-100 d-flex align-items-center">
            <div class="div-loader m-auto">
                <img src="@/assets/loader.gif">
                <div class="text-subheading text-center">Loading</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>

.height-100 {
    height: 100vh;
}
#div-loader{
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    z-index:9999;

}
.div-loader{
    display: grid;
}
.div-loader img{
    width: 60%;
    margin: 0 auto;
    border-radius:50%;
}

</style>