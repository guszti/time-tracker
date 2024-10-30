<script setup lang="ts"></script>

<template>
    <div class="w-full p-6">
        <div class="flex justify-between w-full mb-2 font-bold">
            <div>
                <div class="font-bold text-xl max-w-64">
                    Some work I have done
                </div>
                <small class="block mb-2 font-bold">ProjectA</small>
            </div>
            <div>
                <small class="block">2024-10-11</small>
                <small class="block">09:00 AM - 11:00 AM</small>
            </div>
        </div>
        <p class="mb-2">
            Hares and jackrabbits are mammals belonging to the genus Lepus. They
            are herbivores, and live solitarily or in pairs. They nest in slight
            depressions called forms, and their young are able to fend for
            themselves shortly after birth. The genus includes the largest
            lagomorphs. Most are fast runners with long, powerful hind legs, and
            large ears that dissipate body heat.[1] Hare species are native to
            Africa, Eurasia and North America. A hare less than one year old is
            called a "leveret". A group of hares is called a "husk", a "down",
            or a "drove".
        </p>

        <div class="flex justify-around">
            <button
                class="w-2/5 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
                Edit
            </button>
            <button
                class="w-2/5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Delete
            </button>
        </div>
    </div>
</template>
