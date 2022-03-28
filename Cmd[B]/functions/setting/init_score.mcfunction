#Setting
scoreboard objectives add control dummy "컨트롤 타입"

#Game
scoreboard objectives add airbon dummy "에어본"
scoreboard objectives add airbon_lv dummy "에어본 레벨"
scoreboard objectives add stun dummy "기절"
scoreboard objectives add silence dummy "침묵"

scoreboard objectives add fire dummy "화염"
scoreboard objectives add fire_lv dummy "화염 레벨"
scoreboard objectives add poison dummy "독"
scoreboard objectives add poison_lv dummy "독 레벨"
scoreboard objectives add slow dummy "둔화"
scoreboard objectives add slow_lv dummy "둔화 레벨"
scoreboard objectives add heal_reduce dummy "치유 감소"
scoreboard objectives add heal_reduce_lv dummy "치유 감소 레벨"

scoreboard objectives add invisible dummy "투명화"
scoreboard objectives add invincible dummy "무적"
scoreboard objectives add shield dummy "실드"
scoreboard objectives add speed dummy "신속"
scoreboard objectives add speed_lv dummy "신속 레벨"
scoreboard objectives add cc_resist dummy "CC 저항"
scoreboard objectives add cc_resist_lv dummy "CC 저항 레벨"

scoreboard objectives add base_cool1 dummy "기본 쿨타임1"
scoreboard objectives add base_cool2 dummy "기본 쿨타임2"
scoreboard objectives add base_cool3 dummy "기본 쿨타임3"
scoreboard objectives add base_cool4 dummy "기본 쿨타임4"
scoreboard objectives add cool1 dummy "쿨타임1"
scoreboard objectives add cool2 dummy "쿨타임2"
scoreboard objectives add cool3 dummy "쿨타임3"
scoreboard objectives add cool4 dummy "쿨타임4"
scoreboard objectives add skill1_mana dummy "스킬1 마나"
scoreboard objectives add skill2_mana dummy "스킬2 마나"
scoreboard objectives add skill3_mana dummy "스킬3 마나"
scoreboard objectives add skill4_mana dummy "스킬4 마나"

scoreboard objectives add damaged dummy "준 데미지"
scoreboard objectives add taken_damage dummy "받은 데미지"
scoreboard objectives add healed dummy "가한 회복량"
scoreboard objectives add taken_heal dummy "받은 회복량"
scoreboard objectives add self_heal dummy "자가 회복량"
scoreboard objectives add given_cc dummy "준 CC 시간"
scoreboard objectives add taken_cc dummy "받은 CC 시간"
scoreboard objectives add given_shield dummy "준 실드량"
scoreboard objectives add broken_shield dummy "파괴한 실드량"

scoreboard objectives add maxhp dummy "최대 체력"
scoreboard objectives add hp dummy "체력"
scoreboard objectives add hp_regen dummy "체력 재생"

scoreboard objectives add maxmana dummy "최대 마나"
scoreboard objectives add mana dummy "마나"
scoreboard objectives add mana_regen dummy "마나 재생"

scoreboard objectives add job dummy "직업"
scoreboard objectives add team dummy "팀"

scoreboard objectives add death dummy "데스"
scoreboard objectives add kill dummy "킬"

scoreboard objectives add param1 dummy "파라미터1"
scoreboard objectives add param2 dummy "파라미터2"
scoreboard objectives add param3 dummy "파라미터3"
scoreboard objectives add param4 dummy "파라미터4"
scoreboard objectives add param5 dummy "파라미터5"
scoreboard objectives add temp1 dummy "템프1"
scoreboard objectives add temp2 dummy "템프2"
scoreboard objectives add temp3 dummy "템프3"
scoreboard objectives add result1 dummy "결과1"
scoreboard objectives add result2 dummy "결과2"
scoreboard objectives add result3 dummy "결과3"

scoreboard objectives add projectile_life dummy "투사체 수명"

#Global
scoreboard objectives add global_one dummy "1"
scoreboard objectives add global_two dummy "2"
scoreboard objectives add global_three dummy "3"
scoreboard objectives add global_four dummy "4"
scoreboard objectives add global_five dummy "5"
scoreboard objectives add global_six dummy "6"
scoreboard objectives add global_seven dummy "7"
scoreboard objectives add global_eight dummy "8"
scoreboard objectives add global_nine dummy "9"
scoreboard objectives add global_ten dummy "10"
scoreboard objectives add global_sec dummy "20"
scoreboard objectives add global_hun dummy "100"

#Set Global
scoreboard players set @e[name="config"] global_one 1
scoreboard players set @e[name="config"] global_two 2
scoreboard players set @e[name="config"] global_three 3
scoreboard players set @e[name="config"] global_four 4
scoreboard players set @e[name="config"] global_five 5
scoreboard players set @e[name="config"] global_six 6
scoreboard players set @e[name="config"] global_seven 7
scoreboard players set @e[name="config"] global_eight 8
scoreboard players set @e[name="config"] global_nine 9
scoreboard players set @e[name="config"] global_ten 10
scoreboard players set @e[name="config"] global_sec 20
scoreboard players set @e[name="config"] global_hun 100