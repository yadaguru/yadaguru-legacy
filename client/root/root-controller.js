(function(app) {
  'use strict';

  var RootController = function ($scope, YadaAPI, Utils, ReminderService) {
    $scope.reminders = [];
    $scope.dt = new Date();

    $scope.buildReminderList = function(data) {
      var currentDate = new Date();
      var reminderData = data.reminders,
          testDateData = data.testDates,
          categoryData = data.categories,
          testMessageData = data.testMessages[0],
          testMessageCategory = Utils.lookup(categoryData, '_id', testMessageData.testCategory, 'categoryName'),
          allData,
          reminderMessages,
          groupedMessages;
      reminderData = ReminderService.flattenTimeframes(reminderData);
      reminderData = ReminderService.generateSortDates(reminderData, 'timeframes', $scope.formData.dt);
      var reminderDataWithCategory = [];
      reminderData = reminderData.forEach(function(reminder) {
        reminder.category = Utils.lookup(categoryData, '_id', reminder.category, 'categoryName');
        reminderDataWithCategory.push(reminder);
      });
      testDateData = ReminderService.generateSortDates(testDateData, 'registrationDate');
      testDateData = Utils.addKeyValue(testDateData, 'category', testMessageCategory);
      testDateData = Utils.addKeyValue(testDateData, 'message', testMessageData.satMessage, function(msg) {
        return msg.testType === 'SAT';
      });
      testDateData = Utils.addKeyValue(testDateData, 'detail', testMessageData.satDetail, function(msg) {
        return msg.testType === 'SAT';
      });
      testDateData = Utils.addKeyValue(testDateData, 'message', testMessageData.actMessage, function(msg) {
        return msg.testType === 'ACT';
      });
      testDateData = Utils.addKeyValue(testDateData, 'detail', testMessageData.actDetail, function(msg) {
        return msg.testType === 'ACT';
      });
      allData = reminderDataWithCategory.concat(testDateData);
      allData = Utils.sortBy(allData, 'sortDate');
      reminderMessages = ReminderService.generateMessages(allData, $scope.formData.schoolName, $scope.formData.dt, 
                                                          currentDate, testMessageCategory);
      groupedMessages = Utils.groupBy(reminderMessages, 'date');
      groupedMessages.forEach(function(dateGroup) {
        dateGroup.members = Utils.groupBy(dateGroup.members, 'category');
      });
      $scope.reminders = groupedMessages;
    };

    $scope.getReminders = function(formData) {
      $scope.formData = formData;
      Utils.getModels(YadaAPI, ['reminders', 'testDates', 'testMessages', 'categories'], $scope.buildReminderList);
    };

    $scope.format = 'M/d/yyyy';
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.minDate = new Date();
  };

  var FaqController = function($scope, YadaAPI, $sce) {
    
    $scope.faqContent = '';

    $scope.getFaqs = function() {
      YadaAPI.faqs.get().then(function(resp) {
        $scope.faqContent = $sce.trustAsHtml(resp.data[0].content);
      }, function(err) {console.log(err);});
    };

    $scope.getFaqs();

  };

  app.controller('RootController', ['$scope', 'YadaAPI', 'Utils', 'ReminderService', RootController]);
  app.controller('FaqController', ['$scope', 'YadaAPI', '$sce', FaqController]);

}(angular.module('yg.root')));
