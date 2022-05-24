export default {
  en: {
    common: {
      dialog_title_alert: 'Alert',
      dialog_title_error: 'error',
      dialog_title_confirm: 'Confirm',
    },
    home: {
      homepage: 'Homepage',
      sectionmenu_title_testing: 'Testing',
      sectionmenu_title_rules: 'Groups',
    },
    dashboard: {
      tab_main_title: 'Administration Dashboard',
      tab_main_title_description: "Manage your organization's users, districts, schools, and gruops.",
      sidemenu_title_users: 'Users',
      sidemenu_title_districts: 'Districts',
      sidemenu_title_schools: 'Schools',
      sidemenu_title_groups: 'Groups',
      sidemenu_title_testing_data: 'Testing data',
      sidemenu_title_notifications: 'Notifications',
      sidemenu_title_action_log: 'Action Log',
      sidemenu_title_members: 'Members',
      sidemenu_title_updates: 'Updates',
      sidemenu_title_back: 'Back',

      district_page: {
        page_description: 'Manage districts for your organization',
        page_title: "Your organization's Districts",
        page_label_no_district: 'You currently do not have any districts to display.',
        btn_title_create_new_district: 'Create New District',
        alert_delete_district: 'Are you sure to delete this district?',
        alert_fail_delete_district: 'Delete Fail',

        district_add: {
          page_title: 'Add District',
          btn_title_add_district: 'Add District',
        },
        district_edit: {
          page_title: 'Edit District',
          btn_title_edit_district: 'Save District',
          btn_title_add_school: 'Create/Add New Schools',
          alert_success_save_district: 'District updated',
          alert_fail_save_district: 'Save Fail',
          alert_fail_load_district: 'Load district fail',
        },
      },

      school_page: {
        page_description: 'Manage schools for your organization',
        page_title: "Your organization's Schools",
        page_label_no_schools: 'You currently do not have any schools to display.',
        btn_title_create_new_school: 'Create New School',
        alert_fail_delete_school: 'Delete Fail',

        school_add: {
          page_title: 'Add School',
          btn_title_add_school: 'Add School',
        },
        school_edit: {
          page_title: 'Edit School',
          page_label_no_members: 'You currently do not have any members to display.',
          btn_title_edit_school: 'Save School',
          btn_title_add_school: 'Create/Add New Schools',
          alert_success_save_school: 'School updated',
          alert_fail_save_school: 'Save Fail',
          alert_fail_load_school: 'Load school fail',
        },
      },

      group_page: {
        page_description: 'Manage groups for your organization',
        page_title: "Your organization's Groups",
        page_label_no_group: 'You currently do not have any groups to display.',
        btn_title_create_new_group: 'Create New Group',
        alert_delete_group: 'Are you sure to delete this group?',
        alert_fail_delete_group: 'Delete Fail',

        group_add: {
          page_title: 'Add Group',
          btn_title_add_group: 'Add Group',
        },
        group_edit: {
          page_title: 'Edit Group',
          btn_title_edit_group: 'Save Group',
          btn_title_add_group: 'Create/Add New Groups',
          alert_success_save_group: 'Group updated',
          alert_fail_save_group: 'Save Fail',
          alert_fail_load_group: 'Load group fail',
          page_label_no_members: 'You currently do not have any members to display.',
        },
      },

      member_page: {
        page_description: 'Manage members for your organization',
        page_title: "Your organization's Members",
        page_label_no_members: 'You currently do not have any members to display.',
        btn_title_create_new_member: 'Create New Member',
        member_add: {
          page_title: 'Add Member',
          btn_title_add_school: 'Add Member',
        },
        member_edit: {
          page_title: 'Edit Member',
          page_label_no_members: 'You currently do not have any members to display.',
          btn_title_edit_member: 'Save Member',
          alert_success_save_member: 'Member updated',
          alert_fail_save_member: 'Save Fail',
          alert_fail_load_member: 'Load member fail',
        },
      },
    },
  },
};
