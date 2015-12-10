var SampleData = {
    "PutBack_1": {
        "alert_data": {
            "code": "PtB.A.012",
            "description": "Please put the box in 7",
            "details": [],
            "level": "info"
        },
        "state": "waiting_for_pptl_event",
        "state_data": {
            "current_scanned": {
                "barcode": "FtYWny6YDC",
                "box_uid": "hSCmcPgDAd",
                "description": "Some Really really long longggg description",
                "dimension": [
                    4.1,
                    5.5,
                    5.5
                ],
                "image_url": "http://172.18.91.1/product_images/b23ab8d9-dfcb-4649-8c02-c88fe30f5e5f.png",
                "item_quantity": 2,
                "name": null,
                "weight": 0.25
            },
            "max_coordinates": [
                2,
                4
            ],
            "possible_exceptions": [],
            "ppsbins": [{
                "all_items": [],
                "coordinate": [
                    1,
                    1
                ],
                "ppsbin_id": "4",
                "ppsbin_state": "empty"
            }, {
                "all_items": [],
                "coordinate": [
                    1,
                    2
                ],
                "ppsbin_id": "3",
                "ppsbin_state": "IN USE"
            }, {
                "all_items": [],
                "coordinate": [
                    1,
                    3
                ],
                "ppsbin_id": "2",
                "ppsbin_state": "IN USE"
            }, {
                "all_items": [],
                "coordinate": [
                    1,
                    4
                ],
                "ppsbin_id": "1",
                "ppsbin_state": "IN USE"
            }, {
                "all_items": [],
                "coordinate": [
                    2,
                    1
                ],
                "ppsbin_id": "8",
                "ppsbin_state": "selected"
            }, {
                "all_items": [],
                "coordinate": [
                    2,
                    2
                ],
                "ppsbin_id": "7",
                "ppsbin_state": "empty"
            }, {
                "all_items": [],
                "coordinate": [
                    2,
                    3
                ],
                "ppsbin_id": "6",
                "ppsbin_state": "empty"
            }, {
                "all_items": [],
                "coordinate": [
                    2,
                    4
                ],
                "ppsbin_id": "5",
                "ppsbin_state": "empty"
            }],
            "selected_bin": "7",
            "time_stamp": [
                [
                    123, [
                        [
                            49,
                            52,
                            51,
                            52
                        ],
                        44, [
                            52,
                            51,
                            56,
                            48,
                            49,
                            53
                        ],
                        44, [
                            49,
                            51,
                            56,
                            55,
                            52,
                            52
                        ]
                    ],
                    125
                ]
            ]
        }
    },


    "PutBack_2": {
        "alert_data": {
            "code": "PtB.A.021",
            "description": "Please scan te box to be removed",
            "details": [],
            "level": "info"
        },
        "state": "remove_box_mode",
        "state_data": {
            "max_coordinates": [
                2,
                4
            ],
            "possible_exceptions": [],
            "ppsbins": [{
                "all_items": [],
                "coordinate": [
                    1,
                    1
                ],
                "ppsbin_id": "4",
                "ppsbin_state": "empty"
            }, {
                "all_items": [],
                "coordinate": [
                    1,
                    2
                ],
                "ppsbin_id": "3",
                "ppsbin_state": "empty"
            }, {
                "all_items": [],
                "coordinate": [
                    1,
                    3
                ],
                "ppsbin_id": "2",
                "ppsbin_state": "empty"
            }, {
                "all_items": [],
                "coordinate": [
                    1,
                    4
                ],
                "ppsbin_id": "1",
                "ppsbin_state": "empty"
            }, {
                "all_items": [],
                "coordinate": [
                    2,
                    1
                ],
                "ppsbin_id": "8",
                "ppsbin_state": "empty"
            }, {
                "all_items": [],
                "coordinate": [
                    2,
                    2
                ],
                "ppsbin_id": "7",
                "ppsbin_state": "empty"
            }, {
                "all_items": [],
                "coordinate": [
                    2,
                    3
                ],
                "ppsbin_id": "6",
                "ppsbin_state": "empty"
            }, {
                "all_items": [{
                    "barcode": "A000000358",
                    "box_uid": "1",
                    "description": null,
                    "dimension": [
                        2.8,
                        2.93,
                        3.96
                    ],
                    "image_url": null,
                    "item_quantity": 5,
                    "name": null,
                    "weight": 0.5
                }, {
                    "barcode": "A000000361",
                    "box_uid": "1",
                    "description": null,
                    "dimension": [
                        2.8,
                        2.93,
                        3.96
                    ],
                    "image_url": null,
                    "item_quantity": 5,
                    "name": null,
                    "weight": 0.5
                }],
                "coordinate": [
                    2,
                    4
                ],
                "ppsbin_id": "5",
                "ppsbin_state": "IN USE"
            }],
            "time_stamp": [
                [
                    123, [
                        [
                            49,
                            52,
                            52,
                            48
                        ],
                        44, [
                            53,
                            49,
                            52,
                            52,
                            53
                        ],
                        44, [
                            49,
                            55,
                            57,
                            55,
                            57,
                            56
                        ]
                    ],
                    125
                ]
            ]
        }
    }
};

module.exports = SampleData;
