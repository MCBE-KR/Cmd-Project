tag @s remove movable

execute @s ~ ~ ~ detect ^ ^ ^0.5 air 0 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 water -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 flowing_water -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 conduit -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 wall_sign -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 acacia_wall_sign -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 birch_wall_sign -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 crimson_wall_sign -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 darkoak_wall_sign -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 jungle_wall_sign -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 spruce_wall_sign -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 warped_wall_sign -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 standing_banner -1 tag @s add movable
execute @s[tag=!movable] ~ ~ ~ detect ^ ^ ^0.5 wall_banner -1 tag @s add movable